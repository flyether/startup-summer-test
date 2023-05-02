import { Catalogue } from "../../models";

export const stringCattingFunc = (dataCatalogue: Catalogue[]) => {
  const titles = dataCatalogue.map((catalogue: Catalogue) => {
    const title = catalogue.title_rus;
    const maxLength = 30;
    let label = title;
    if (title.length > maxLength) {
      const lastSpaceIndex = title.lastIndexOf(" ", maxLength);
      if (lastSpaceIndex !== -1) {
        label = `${title.substring(0, lastSpaceIndex)}-\n${title.substring(
          lastSpaceIndex + 1
        )}`;
      }
    }
    return {
      value: `${catalogue.key}`,
      label: label,
    };
  });
  return titles;
};
