"""
DSA Website Selenium Test Script
Default target: localhost (for local dev). You can override the URL with the
environment variable TEST_BASE_URL or the --url CLI argument.

Example usage:
    python test.py --url http://localhost:5175 --driver-path C:\WebDriver\msedgedriver.exe
"""

from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time
from datetime import datetime

class DSAWebsiteTester:
    def __init__(self, base_url: str = None, driver_path: str = None, headless: bool = False):
        # allow override from env var, CLI, or default to localhost dev port
        import os
        self.base_url = base_url or os.environ.get("TEST_BASE_URL") or "http://localhost:5175"
        self.driver = None
        self.results = []
        self.driver_path = driver_path or r"C:\WebDriver\msedgedriver.exe"
        self.headless = headless
        
    def setup_driver(self):
        """Initialize Edge WebDriver"""
        print("\n[INFO] Initializing Microsoft Edge WebDriver...")
        
        edge_options = Options()
        if self.headless:
            edge_options.add_argument('--headless=new')
        edge_options.add_argument('--start-maximized')
        edge_options.add_argument('--disable-blink-features=AutomationControlled')
        edge_options.set_capability('acceptInsecureCerts', True)

        # Use configured driver path
        import os

        # If a local driver binary exists, use it. Otherwise, try to auto-download
        # using webdriver-manager (convenient for CI/local runs).
        if self.driver_path and os.path.exists(self.driver_path):
            service = Service(executable_path=self.driver_path)
            try:
                self.driver = webdriver.Edge(service=service, options=edge_options)
                self.driver.implicitly_wait(10)
                print("[SUCCESS] Edge WebDriver initialized successfully using provided driver path!\n")
                return
            except Exception as e:
                print(f"[WARN] Failed to initialize Edge with provided driver path {self.driver_path}: {e}")

        # Try webdriver-manager fallback
        try:
            from webdriver_manager.microsoft import EdgeChromiumDriverManager
            mgr_path = EdgeChromiumDriverManager().install()
            service = Service(executable_path=mgr_path)
            self.driver = webdriver.Edge(service=service, options=edge_options)
            self.driver.implicitly_wait(10)
            print("[SUCCESS] Edge WebDriver initialized successfully using webdriver-manager!\n")
            return
        except ImportError:
            print("[ERROR] webdriver-manager is not installed. Install with: python -m pip install webdriver-manager")
            raise
        except Exception as e:
            print(f"[ERROR] Failed to initialize Edge WebDriver via webdriver-manager: {e}")
            raise
        
    def log_result(self, test_name, status, message):
        """Log test results"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        result = {
            'time': timestamp,
            'test': test_name,
            'status': status,
            'message': message
        }
        self.results.append(result)
        
        icon = "✓" if status == "PASS" else "✗"
        color_code = "[PASS]" if status == "PASS" else "[FAIL]"
        print(f"{icon} {color_code} {test_name}")
        print(f"   └─ {message}")
        
    def test_1_sidebar_navigation(self):
        """Test Case 1: Sidebar Navigation Verification"""
        print("\n" + "="*60)
        print("TEST CASE 1: Sidebar Navigation")
        print("="*60)
        
        try:
            self.driver.get(self.base_url)
            time.sleep(3)
            
            nav_items = {
                "Practice": "/practice",
                "Quiz": "/quiz",
                "Resources": "/resources",
                "Calendar": "/calendar",
                "Community": "/community"
            }
            
            for item_name, expected_path in nav_items.items():
                try:
                    nav_button = None
                    selectors = [
                        f"//a[contains(text(), '{item_name}')]",
                        f"//button[contains(text(), '{item_name}')]",
                        f"//nav//a[contains(@href, '{expected_path}')]",
                        f"//*[contains(text(), '{item_name}') and (self::a or self::button)]"
                    ]
                    
                    for selector in selectors:
                        try:
                            nav_button = WebDriverWait(self.driver, 5).until(
                                EC.element_to_be_clickable((By.XPATH, selector))
                            )
                            if nav_button:
                                break
                        except:
                            continue
                    
                    if nav_button:
                        nav_button.click()
                        time.sleep(2)
                        
                        current_url = self.driver.current_url
                        if expected_path in current_url:
                            self.log_result(
                                f"Navigate to {item_name}",
                                "PASS",
                                f"Successfully navigated to {current_url}"
                            )
                        else:
                            self.log_result(
                                f"Navigate to {item_name}",
                                "FAIL",
                                f"Expected path '{expected_path}' not in URL: {current_url}"
                            )
                    else:
                        self.log_result(
                            f"Navigate to {item_name}",
                            "FAIL",
                            f"Could not find navigation button for {item_name}"
                        )
                        
                except Exception as e:
                    self.log_result(
                        f"Navigate to {item_name}",
                        "FAIL",
                        f"Error: {str(e)}"
                    )
                    
        except Exception as e:
            self.log_result("Sidebar Navigation Test", "FAIL", f"Critical error: {str(e)}")
    
    def test_2_problem_list_interaction(self):
        """Test Case 2: Problem List Interaction"""
        print("\n" + "="*60)
        print("TEST CASE 2: Problem List Interaction")
        print("="*60)
        
        try:
            self.driver.get(f"{self.base_url}/practice")
            time.sleep(3)
            
            problem_selectors = [
                "//div[contains(@class, 'problem')]",
                "//li[contains(@class, 'problem')]",
                "//a[contains(@href, 'problem')]",
                "//*[@data-testid='problem-card']",
                "//div[contains(@class, 'card')]"
            ]
            
            problems = []
            for selector in problem_selectors:
                try:
                    problems = self.driver.find_elements(By.XPATH, selector)
                    if len(problems) > 0:
                        break
                except:
                    continue
            
            if len(problems) > 0:
                self.log_result(
                    "Problem List Loaded",
                    "PASS",
                    f"Found {len(problems)} problem items on the page"
                )
                
                try:
                    first_problem = WebDriverWait(self.driver, 5).until(
                        EC.element_to_be_clickable(problems[0])
                    )
                    problem_text = first_problem.text[:50]
                    first_problem.click()
                    time.sleep(2)
                    
                    if self.driver.current_url != f"{self.base_url}/practice":
                        self.log_result(
                            "Problem Click Navigation",
                            "PASS",
                            f"Clicked problem and navigated to: {self.driver.current_url}"
                        )
                    else:
                        self.log_result(
                            "Problem Click Navigation",
                            "FAIL",
                            "Problem clicked but URL did not change"
                        )
                except Exception as e:
                    self.log_result(
                        "Problem Click Navigation",
                        "FAIL",
                        f"Could not click problem: {str(e)}"
                    )
            else:
                self.log_result(
                    "Problem List Loaded",
                    "FAIL",
                    "No problems found on practice page"
                )
                
        except Exception as e:
            self.log_result("Problem List Test", "FAIL", f"Critical error: {str(e)}")
    
    def test_3_dashboard_components(self):
        """Test Case 3: Dashboard Components Verification"""
        print("\n" + "="*60)
        print("TEST CASE 3: Dashboard Components")
        print("="*60)
        
        try:
            self.driver.get(self.base_url)
            time.sleep(3)
            
            components = {
                "Dashboard Stats": ["//div[contains(@class, 'stats')]", "//div[contains(@class, 'stat')]"],
                "Recent Activity": ["//div[contains(@class, 'activity')]", "//*[contains(text(), 'Activity')]"],
                "Upcoming Events": ["//div[contains(@class, 'events')]", "//*[contains(text(), 'Event')]"],
                "Main Content": ["//main", "//div[@id='root']"]
            }
            
            for component_name, selectors in components.items():
                found = False
                for selector in selectors:
                    try:
                        element = self.driver.find_element(By.XPATH, selector)
                        if element.is_displayed():
                            found = True
                            clickables = element.find_elements(By.CSS_SELECTOR, "button, a, [role='button']")
                            self.log_result(
                                f"{component_name} Component",
                                "PASS",
                                f"Component visible with {len(clickables)} interactive elements"
                            )
                            break
                    except:
                        continue
                
                if not found:
                    self.log_result(
                        f"{component_name} Component",
                        "FAIL",
                        "Component not found or not visible"
                    )
                    
        except Exception as e:
            self.log_result("Dashboard Components Test", "FAIL", f"Critical error: {str(e)}")
    
    def test_4_quiz_functionality(self):
        """Test Case 4: Quiz Page Functionality"""
        print("\n" + "="*60)
        print("TEST CASE 4: Quiz Page Functionality")
        print("="*60)
        
        try:
            self.driver.get(f"{self.base_url}/quiz")
            time.sleep(3)
            
            page_source = self.driver.page_source.lower()
            if 'quiz' in page_source or 'question' in page_source:
                self.log_result(
                    "Quiz Page Load",
                    "PASS",
                    "Quiz page loaded successfully"
                )
            else:
                self.log_result(
                    "Quiz Page Load",
                    "FAIL",
                    "Quiz page content not detected"
                )
            
            button_texts = ["Start", "Begin", "Submit", "Next", "Take Quiz"]
            found_button = False
            
            for btn_text in button_texts:
                try:
                    button = self.driver.find_element(By.XPATH, f"//button[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{btn_text.lower()}')]")
                    if button.is_enabled():
                        found_button = True
                        self.log_result(
                            "Quiz Button Found",
                            "PASS",
                            f"Found clickable '{btn_text}' button"
                        )
                        
                        try:
                            button.click()
                            time.sleep(2)
                            self.log_result(
                                "Quiz Button Click",
                                "PASS",
                                f"Successfully clicked '{btn_text}' button"
                            )
                        except:
                            pass
                        break
                except:
                    continue
            
            if not found_button:
                all_buttons = self.driver.find_elements(By.TAG_NAME, "button")
                if len(all_buttons) > 0:
                    self.log_result(
                        "Quiz Buttons",
                        "PASS",
                        f"Found {len(all_buttons)} buttons on quiz page"
                    )
                else:
                    self.log_result(
                        "Quiz Buttons",
                        "FAIL",
                        "No buttons found on quiz page"
                    )
                    
        except Exception as e:
            self.log_result("Quiz Functionality Test", "FAIL", f"Critical error: {str(e)}")
    
    def test_5_authentication_routes(self):
        """Test Case 5: Authentication and Protected Routes"""
        print("\n" + "="*60)
        print("TEST CASE 5: Authentication & Protected Routes")
        print("="*60)
        
        protected_routes = ["/practice", "/quiz", "/resources", "/calendar", "/community"]
        
        for route in protected_routes:
            try:
                self.driver.get(f"{self.base_url}{route}")
                time.sleep(2)
                
                current_url = self.driver.current_url
                
                if "/login" in current_url.lower():
                    self.log_result(
                        f"Route {route} Access",
                        "FAIL",
                        "Redirected to login (Edge bypass not working)"
                    )
                elif route in current_url:
                    body = self.driver.find_element(By.TAG_NAME, "body")
                    if len(body.text) > 100:
                        self.log_result(
                            f"Route {route} Access",
                            "PASS",
                            "Accessed without login (Edge bypass working)"
                        )
                    else:
                        self.log_result(
                            f"Route {route} Access",
                            "FAIL",
                            "Page loaded but content is empty"
                        )
                else:
                    self.log_result(
                        f"Route {route} Access",
                        "FAIL",
                        f"Unexpected redirect to: {current_url}"
                    )
                    
            except Exception as e:
                self.log_result(
                    f"Route {route} Access",
                    "FAIL",
                    f"Error accessing route: {str(e)}"
                )
        
        try:
            self.driver.get(f"{self.base_url}/login")
            time.sleep(2)
            
            inputs = self.driver.find_elements(By.TAG_NAME, "input")
            buttons = self.driver.find_elements(By.TAG_NAME, "button")
            
            if len(inputs) > 0 and len(buttons) > 0:
                self.log_result(
                    "Login Form Elements",
                    "PASS",
                    f"Found {len(inputs)} inputs and {len(buttons)} buttons"
                )
            else:
                self.log_result(
                    "Login Form Elements",
                    "FAIL",
                    "Login form elements not found"
                )
                
        except Exception as e:
            self.log_result("Login Page Test", "FAIL", f"Error: {str(e)}")
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("TEST EXECUTION SUMMARY")
        print("="*60)
        
        total = len(self.results)
        passed = sum(1 for r in self.results if r['status'] == 'PASS')
        failed = total - passed
        
        print(f"\nTotal Tests: {total}")
        print(f"Passed: {passed} ✓")
        print(f"Failed: {failed} ✗")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if failed > 0:
            print("\n--- Failed Tests ---")
            for result in self.results:
                if result['status'] == 'FAIL':
                    print(f"  • {result['test']}: {result['message']}")
        
        print("\n" + "="*60)
    
    def run_all_tests(self):
        """Execute all test cases"""
        try:
            print("\n" + "╔"+"="*58+"╗")
            print("║" + " "*10 + "DSA WEBSITE SELENIUM TEST SUITE" + " "*16 + "║")
            print("║" + " "*10 + f"Target: {self.base_url}" + " "*(48-len(self.base_url)) + "║")
            print("╚"+"="*58+"╝")
            
            self.setup_driver()
            
            self.test_1_sidebar_navigation()
            self.test_2_problem_list_interaction()
            self.test_3_dashboard_components()
            self.test_4_quiz_functionality()
            self.test_5_authentication_routes()
            
            self.print_summary()
            
        except Exception as e:
            print(f"\n[CRITICAL ERROR] Test suite failed: {str(e)}")
            
        finally:
            if self.driver:
                print("\n[INFO] Closing browser...")
                self.driver.quit()
                print("[INFO] Test execution completed!")

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Run DSA website Selenium tests against a target URL")
    parser.add_argument("--url", help="Base URL to test (overrides TEST_BASE_URL env)", default=None)
    parser.add_argument("--driver-path", help="Path to msedgedriver.exe", default=None)
    parser.add_argument("--headless", help="Run browser in headless mode", action="store_true")

    args = parser.parse_args()

    tester = DSAWebsiteTester(base_url=args.url, driver_path=args.driver_path, headless=args.headless)
    print(f"[INFO] Running tests against: {tester.base_url}")
    tester.run_all_tests()
