export default function setInvisibleOptions(options, num) {
  let optionsChanged = 0;

  while (optionsChanged < num) {
    const randomIndex = Math.floor(Math.random() * options.length);
    const option = options[randomIndex];
    if (!option.is_correct && option.show) {
      option.show = false;
      optionsChanged += 1;
    }
  }
  return options;
}
