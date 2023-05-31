// Add event listener to the calculate button
function calculateBMI() {

    // Get input values
const weight = document.getElementById('weightInput').value;
const height = document.getElementById('heightInput').value;

    // Calculate BMI
   const BMIResult = weight / (height * height);


  // Check validity
  if (weight <= 0 || height <= 0) {
    // Display error message and change text color to red
    document.getElementById('result').innerHTML = `Invalid Input!! Enter Your Right Weight and Height.`;
    document.getElementById('result').style.color = "red";
    document.querySelectorAll('#weightInput, #heightInput').forEach(element => element.style.border = "2px solid red");
  } else {
    // Display result and change text color to default
    document.getElementById('result').innerHTML = `Your BMI is ${BMIResult.toFixed(2)}`;
    document.getElementById('result').style.color = "Green";
    document.querySelectorAll('#weightInput, #heightInput').forEach(element => element.style.border = "solid 2px #ffc000");
  }
};
