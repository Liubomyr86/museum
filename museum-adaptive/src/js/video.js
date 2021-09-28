const progressInputs = document.querySelectorAll('.progress');

const changeValue = () => {
  progressInputs.forEach((element) => {
    element.addEventListener('input', function() {
      const value = this.value;
      console.log(value)
      this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
    })
  })

}

export default changeValue();
