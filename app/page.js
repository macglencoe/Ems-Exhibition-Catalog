import Image from "next/image";
import styles from "./page.module.css";

import dynamic from 'next/dynamic';

import fs from 'fs';
import path from 'path';
import ScrollHandler from "@/components/scrollHandler";
import Catalog from "@/components/catalog";


export default async function ExhibitionList() {
  const itemsDirectory = path.join(process.cwd(), 'public/items');
  const itemFolders = fs.readdirSync(itemsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const items = itemFolders.map(folder => {
    const folderPath = path.join(itemsDirectory, folder);
    const imgPath = "/items/" + folder + "/img.jpg";

    const descriptionPath = path.join(folderPath, 'description.txt');
    let description = '';
    if (fs.existsSync(descriptionPath)) {
      description = fs.readFileSync(descriptionPath, 'utf8');
    }

    const titlePath = path.join(folderPath, 'title.txt');
    let title = '';
    if (fs.existsSync(titlePath)) {
      title = fs.readFileSync(titlePath, 'utf8');
    }

    const creatorPath = path.join(folderPath, 'creator.txt');
    let creator = '';
    if (fs.existsSync(creatorPath)) {
      creator = fs.readFileSync(creatorPath, 'utf8');
    }

    const imageCaptionPath = path.join(folderPath, 'image-caption.txt');
    let imageCaption = '';
    if (fs.existsSync(imageCaptionPath)) {
      imageCaption = fs.readFileSync(imageCaptionPath, 'utf8');
    }

    const birthDeathPath = path.join(folderPath, 'birth-death.txt');
    let birthDeath = '';
    if (fs.existsSync(birthDeathPath)) {
      birthDeath = fs.readFileSync(birthDeathPath, 'utf8');
    }

    const circaPath = path.join(folderPath, 'circa.txt');
    let circa = '';
    if (fs.existsSync(circaPath)) {
      circa = fs.readFileSync(circaPath, 'utf8');
    }

    const tombstonePath = path.join(folderPath, 'tombstone.txt');
    let tombstone = '';
    if (fs.existsSync(tombstonePath)) {
      tombstone = fs.readFileSync(tombstonePath, 'utf8').replace(/\n/g, '\n');
    }

    return { slug: folder, image: imgPath, description, title, creator, imageCaption, birthDeath, circa, tombstone };
  });

  const EmmaEmail = "emma.cote@aauni.edu";





  return (
    <>
      <Catalog items={items} />
    </>
  );
}
