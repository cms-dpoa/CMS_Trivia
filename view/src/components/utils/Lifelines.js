export default function setInvisibleOptions(options, numOptionsToSetFalse) {
  let optionsChanged = 0;
  const valueOptions = Object.values(options);

  while (optionsChanged < numOptionsToSetFalse) {
    const randomIndex = Math.floor(Math.random() * valueOptions.length);
    const option = valueOptions[randomIndex];
    if (!option.is_correct && option.show) {
      option.show = false;
      optionsChanged += 1;
    }
  }

  const newOptions = {};
  valueOptions.forEach((option, index) => {
    newOptions[index + 1] = option;
  });
  return options;
}
