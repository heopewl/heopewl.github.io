import os
from playwright.sync_api import sync_playwright

def run_verification(page):
    # Construct filepath URL for index.html
    cwd = os.getcwd()
    url = f"file://{cwd}/index.html"
    print(f"Opening {url}")
    page.goto(url)
    page.wait_for_timeout(1000)

    # List of pages to test
    nav_items = ["About", "Resume", "Portfolio", "Blog"]

    for item in nav_items:
        print(f"Testing navigation to: {item}")
        # Find the button by text and click it
        btn = page.get_by_role("button", name=item, exact=True)
        if btn.is_visible():
            btn.click()
            page.wait_for_timeout(500)

            # Take a screenshot for each page
            screenshot_path = f"/home/jules/verification/screenshots/{item.lower()}_page.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

            # Verify the article with data-page attribute is active
            article = page.locator(f"article[data-page='{item.lower()}']")
            is_active = "active" in article.get_attribute("class")
            print(f"Article '{item.lower()}' is active: {is_active}")

            # Verify other articles are not active
            all_articles = page.locator("article[data-page]")
            for i in range(all_articles.count()):
                art = all_articles.nth(i)
                data_page = art.get_attribute("data-page")
                if data_page != item.lower():
                    is_other_active = "active" in art.get_attribute("class")
                    if is_other_active:
                        print(f"ERROR: Article '{data_page}' is still active when it shouldn't be.")
        else:
            print(f"ERROR: Navigation button '{item}' not found or not visible.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_verification(page)
        except Exception as e:
            print(f"Exception occurred: {e}")
        finally:
            context.close()
            browser.close()
