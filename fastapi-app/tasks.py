import time

def write_notification(book_title: str):
    time.sleep(5)  # Simulate a long task

    with open("notifications.txt", "a") as file:
        file.write(f"Book '{book_title}' was added successfully.\n")