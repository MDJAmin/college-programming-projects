

def fahrenheit_to_celsius(f):
    c = (f - 32) * 5 / 9
    return c


f = float(input("Enter temperature in Fahrenheit: "))
print("Celsius:", fahrenheit_to_celsius(f))

