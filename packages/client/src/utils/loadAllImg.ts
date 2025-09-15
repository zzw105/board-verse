import cardsImg from "../assets/imgs/cards.png";
import gemsImg from "../assets/imgs/gems.png";

export let gemsImage: HTMLImageElement | null = null;
export function getGemsImage(): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    if (gemsImage) {
      resolve(gemsImage);
      return;
    }
    const img = new window.Image();
    img.src = gemsImg;
    img.onload = () => {
      gemsImage = img;
      resolve(img);
    };
  });
}

export let cardsImage: HTMLImageElement | null = null;
export function getCardsImage(): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    if (cardsImage) {
      resolve(cardsImage);
      return;
    }
    const img = new window.Image();
    img.src = cardsImg;
    img.onload = () => {
      cardsImage = img;
      resolve(img);
    };
  });
}

export const loadAllImg = async () => {
  const res = await Promise.all([getCardsImage(), getGemsImage()]);
  return res;
};
