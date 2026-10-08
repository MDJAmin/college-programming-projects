# MOHAMMAD AMIN JAFARNEZHAD - 12539

students = {}

for i in range(5):
    print("\nStudent", i + 1)

    code = int(input("Student code: "))
    name = input("Full name: ")
    level = input("Level: ")

    math = float(input("Math: "))
    arabic = float(input("Arabic: "))
    programming = float(input("Programming: "))
    network = float(input("Network: "))

    average = (math + arabic + programming + network) / 4
    passed = average > 16

    students[code] = {
        "name": name,
        "level": level,
        "math": math,
        "arabic": arabic,
        "programming": programming,
        "network": network,
        "average": average,
        "passed": passed
    }

print("\nStudent Dictionary Keys:")

for key in students.keys():
    print(key)

print("\nStudents Information:")

for code, stu in students.items():
    print("\nStudent Code:", code)
    print("Name:", stu["name"])
    print("Level:", stu["level"])
    print("Math:", stu["math"])
    print("Arabic:", stu["arabic"])
    print("Programming:", stu["programming"])
    print("Network:", stu["network"])
    print("Average: {:.2f}".format(stu["average"]))
    print("Passed:", stu["passed"])

lesson = input("\nEnter lesson name: ").lower()

print("\nLesson Scores:")

for code, stu in students.items():
    if lesson in stu:
        print(stu["name"], ":", stu[lesson])
    else:
        print("Lesson not found")
        break