function setInvisibleOptions(correctOption, numOptionsToSetFalse) {
  const showOptions = { 1: true, 2: true, 3: true, 4: true };
  let optionsChanged = 0;
  let options = [1, 2, 3, 4];
  options = options.filter((option) => option !== correctOption);

  while (optionsChanged < numOptionsToSetFalse) {
    const randomIndex = Math.floor(Math.random() * options.length);
    const option = options[randomIndex];
    if (showOptions[option]) {
      showOptions[option] = false;
      optionsChanged += 1;
    }
  }
  return showOptions;
}

export default setInvisibleOptions;
