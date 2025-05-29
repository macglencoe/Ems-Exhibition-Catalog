import Image from "next/image";
import styles from "./page.module.css";

import dynamic from 'next/dynamic';

import fs from 'fs';
import path from 'path';
import ScrollHandler from "@/components/scrollHandler";
import Catalog from "@/components/catalog";
import works from "../public/data/works.json";


export default async function ExhibitionList() {
  const itemsDirectory = path.join(process.cwd(), 'public/items');
  const itemFolders = fs.readdirSync(itemsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  /* const items = itemFolders.map(folder => {
    const folderTitlePath = path.join(itemsDirectory, folder, 'title.txt');
    let folderTitle = '';
    if (fs.existsSync(folderTitlePath)) {
      folderTitle = fs.readFileSync(folderTitlePath, 'utf8');
    }
    const folderPath = path.join(itemsDirectory, folder);
    const subFolderPaths = fs.readdirSync(folderPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => path.join(folderPath, dirent.name));

    const items = subFolderPaths.map(subFolderPath => {
      const subFolderName = path.parse(subFolderPath).name;
      const imgPath = "/items/" + folder + "/" + subFolderName + "/img.jpg";

      const descriptionPath = path.join(subFolderPath, 'description.txt');
      let description = '';
      if (fs.existsSync(descriptionPath)) {
        description = fs.readFileSync(descriptionPath, 'utf8');
      }

      const titlePath = path.join(subFolderPath, 'title.txt');
      let title = '';
      if (fs.existsSync(titlePath)) {
        title = fs.readFileSync(titlePath, 'utf8');
      }

      const creatorPath = path.join(subFolderPath, 'creator.txt');
      let creator = '';
      if (fs.existsSync(creatorPath)) {
        creator = fs.readFileSync(creatorPath, 'utf8');
      }

      const imageCaptionPath = path.join(subFolderPath, 'image-caption.txt');
      let imageCaption = '';
      if (fs.existsSync(imageCaptionPath)) {
        imageCaption = fs.readFileSync(imageCaptionPath, 'utf8');
      }

      const birthDeathPath = path.join(subFolderPath, 'birth-death.txt');
      let birthDeath = '';
      if (fs.existsSync(birthDeathPath)) {
        birthDeath = fs.readFileSync(birthDeathPath, 'utf8');
      }

      const circaPath = path.join(subFolderPath, 'circa.txt');
      let circa = '';
      if (fs.existsSync(circaPath)) {
        circa = fs.readFileSync(circaPath, 'utf8');
      }

      const tombstonePath = path.join(subFolderPath, 'tombstone.txt');
      let tombstone = '';
      if (fs.existsSync(tombstonePath)) {
        tombstone = fs.readFileSync(tombstonePath, 'utf8').replace(/\n/g, '\n');
      }

      return { slug: subFolderName, image: imgPath, description, title, creator, imageCaption, birthDeath, circa, tombstone };
    });

    return { slug: folder, items, title: folderTitle };
  });  */

  const items = works;


  console.log(items);

  const EmmaEmail = "emma.cote@aauni.edu";





  return (
    <>
      <Catalog items={items} />
    </>
  );
}
