async function name() {
  
  setTimeout(() => {
    setTimeout(() => {
      console.log(3445);
    }, 7000);
    console.log(3445);
  }, 3000);

  setTimeout(() => {
    console.log(345);
  }, 1000);
}

name()