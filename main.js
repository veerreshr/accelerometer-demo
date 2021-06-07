const errorMessage = document.getElementById("error");
const frequency = document.getElementById("frequency");
const activated = document.getElementById("activated");
const x = document.getElementById("x");
const y = document.getElementById("y");
const z = document.getElementById("z");
const freq = 30;

if ("Accelerometer" in window) {
  navigator.permissions
    .query({ name: "accelerometer" })
    .then((result) => {
      if (result.state != "granted") {
        errorMessage.innerHTML =
          "Sorry, we're not allowed to access sensors on your device.";
        return;
      }

      let acl = new Accelerometer({ frequency: freq });
      acl.addEventListener("activate", () => {
        frequency.innerHTML = freq;
        activated.innerHTML = "True";
      });
      acl.addEventListener("error", (error) => {
        errorMessage.innerHTML = `Error: ${error.name}`;
      });
      acl.addEventListener("reading", () => {
        x.innerHTML = acl.x;
        y.innerHTML = acl.y;
        z.innerHTML = acl.z;
      });
      acl.start();
    })
    .catch((err) => {
      errorMessage.innerHTML =
        "Integration with Permissions API is not enabled";
    });
} else {
  errorMessage.innerHTML = "Your browser doesn't support sensors.";
}
