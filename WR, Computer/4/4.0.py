# MOHAMMAD AMIN JAFARNEZHAD - 12539

student = {
    "name": input("Name: "),
    "lesson1": float(input("Lesson 1: ")),
    "lesson2": float(input("Lesson 2: ")),
    "lesson3": float(input("Lesson 3: "))
}

student["average"] = (student["lesson1"] + student["lesson2"] + student["lesson3"]) / 3

print("Average:", student["average"])

if student["average"] > 18:
    print("Excellent student!")