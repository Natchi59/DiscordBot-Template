# Template Bot Discord Javascript

## Présentation

Voici un template simple d'un bot Discord en Javascript avec une base de donnée MongoDB.  
Celui ci possède un handler pour les événements et les commandes dans les dossiers respectifs `events` et `commands`.  
Les schémas de la base de donnée se situent dans le dossier `database`.  
Et le plus important, le client, qui se situe dans son dossier `client`.

## Installation

Vous pouvez télécharger le code directement sur Github.  
Ou vous pouvez taper la commande

```
git clone -b JS https://github.com/Natchi59/DiscordBot-Template.git
```

Puis vous pouvez installer les dépendences.

Via npm

```
npm install
```

Via Yarn

```
yarn install
```

Puis une fois installé, il vous suffit de renommer le fichier `example.config.json` en `config.json` et de compléter les champs requis.