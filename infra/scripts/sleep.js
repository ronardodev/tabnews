function sleep(seconds) {
  seconds = process.argv[2];
  console.log("sleep-on ", seconds);
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

sleep();
