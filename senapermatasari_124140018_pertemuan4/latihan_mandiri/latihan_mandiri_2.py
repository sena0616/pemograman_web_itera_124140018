celcius = float(input("Masukkan suhu dalam Celcius: "))

fahrenheit = celcius * 9 / 5 + 32
kelvin = celcius + 273.15

print("\n--- HASIL KONVERSI SUHU ---")
print(f"Celcius    : {celcius:.2f} °C")
print(f"Fahrenheit : {fahrenheit:.2f} °F")
print(f"Kelvin     : {kelvin:.2f} K")