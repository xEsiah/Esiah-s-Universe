export interface StoryLine {
  speaker: string;
  text: string;
  characterImage?: string;
  characterPosition?: "left" | "right" | "center";
  characterFlip?: boolean;
}

export interface StoryChoice {
  text: string;
  nextId: string;
}

export interface StoryNode {
  id: string;
  background: string;
  lines: StoryLine[];
  choices?: StoryChoice[];
  nextId?: string;
}

const basePath = "/images/les-voix-de-l-exil";

export const DataLVDLE: Record<string, StoryNode> = {
  intro: {
    id: "intro",
    background: `${basePath}/viewSwainWatching.webp`,
    lines: [
      {
        speaker: "Narrateur",
        text: "A Noxus, au cœur de la cité où résonnent les cris des arènes et où le sang sèche sur la pierre, deux jeunes hommes rêvent de liberté. Azhari, ancien érudit devenu gladiateur, et Lysandor, héritier d’un nom lié à la guerre, aspirent à fuir l’ombre de Noxus pour un renouveau.",
        characterPosition: "center",
      },
      {
        speaker: "Narrateur",
        text: "Depuis les sombres remparts du Bastion Immortel, ils s’élanceront à travers les Plaines de Drazhan, traverseront la mer vers Zaun, avant peut-être d’atteindre les hauteurs étincelantes de Piltover. À chaque étape, ils feront face à l’abandon, au courage et à la promesse incertaine d’un nouveau départ.",
        characterPosition: "center",
      },
    ],
    nextId: "citation",
  },
  citation: {
    id: "intro",
    background: `${basePath}/viewImmortalBastionFromOutside.webp`,
    lines: [
      {
        speaker: "Lysandor du Couteau",
        text: "« Je suis prêt à naître de nouveau. »",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "center",
      },
    ],
    nextId: "chapter0",
  },

  chapter0: {
    id: "chapter0",
    background: `${basePath}/viewNoxusInterArene.webp`,
    lines: [
      {
        speaker: "Azhari",
        text: "Cette ville... ce tombeau... Ils nous forgent à coups de chaînes et d’illusions. Depuis que j'ai foulé les pierres de cette cité, je ne me souviens plus de ce que c'est que de sourire.",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "Ici, on ne vit pas. On survit. Et si tu n'es pas assez fort... tu n'es plus rien.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Azhari",
        text: "Nous sommes des ombres ici, des armes qu'ils dressent... Moi, fils d'érudit, ne servant qu'à améliorer leur technologie. Toi, héritier d'une lignée condamnée à ne connaître que la guerre...",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "Et pourtant, un autre chemin existe, Azhari... Un lieu où l'esprit triomphe du glaive. Piltover.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Azhari",
        text: "Alors fuyons. Laissons derrière nous cette prison de pierre. Devenons ce que nous choisissons d'être.",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Azhari",
        text: "Es-tu prêt à renoncer à tout ? Même à ton nom ?",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "Je suis prêt à naître de nouveau.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "right",
      },
    ],
    nextId: "chapter1",
  },

  chapter1: {
    id: "chapter1",
    background: `${basePath}/viewImmortalBastionFromInside.webp`,
    lines: [
      {
        speaker: "Azhari",
        text: "Si on est vus en train de quitter la place haute du bastion on risque d’éveiller les soupçons non ?",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "Effectivement mais avec ma réputation on devrait pouvoir se justifier à n’importe qui ! Enfin tant que nous n’avons pas à faire à Darius...",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Darius",
        text: "HALTE VOUS DEUX ! Lysandor, te voir dans la partie basse à cette heure est surprenant… J’ai presque l’impression de voir deux jeunes âmes qui fuient Noxus... Pathétique.",
        characterImage: `${basePath}/Darius.webp`,
        characterPosition: "center",
      },
      {
        speaker: "Darius",
        text: "Dites-moi, pourquoi ne devrais-je pas vous abattre sur-le-champ ?",
        characterImage: `${basePath}/Darius.webp`,
        characterPosition: "center",
      },
      {
        speaker: "Azhari",
        text: "Nous ne fuyons pas, nous partons en mission. Une tâche confiée par un supérieur, hors des frontières.",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Darius",
        text: "Une mission, hein ? Et qui est ce fameux supérieur ?",
        characterImage: `${basePath}/Darius.webp`,
        characterPosition: "center",
      },
    ],
    choices: [
      { text: "Rammus", nextId: "chapter1_rammus" },
      { text: "Marcus", nextId: "chapter1_marcus" },
      { text: "Ezreal", nextId: "chapter1_ezreal" },
    ],
  },

  chapter1_marcus: {
    id: "chapter1_marcus",
    background: `${basePath}/viewImmortalBastionFromInside.webp`,
    lines: [
      {
        speaker: "Lysandor",
        text: "C’est mon oncle. Il nous a envoyés pour intercepter un marchand itinérant aux abords de la ville. Il transporte une relique shurimienne… Elle ne doit pas tomber entre de mauvaises mains.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Darius",
        text: "Marcus… ça change tout.",
        characterImage: `${basePath}/Darius.webp`,
        characterPosition: "center",
      },
      {
        speaker: "Darius",
        text: "Ne traînez pas. Et si j’apprends que vous mentez…",
        characterImage: `${basePath}/Darius.webp`,
        characterPosition: "center",
      },
      {
        speaker: "Lysandor",
        text: "Gloire à Noxus.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "right",
      },
    ],
    nextId: "chapter2_success",
  },

  chapter1_ezreal: {
    id: "chapter1_ezreal",
    background: `${basePath}/viewImmortalBastionFromInside.webp`,
    lines: [
      {
        speaker: "Darius",
        text: "Tu crois me faire avaler ça ? Ezreal ? Ce gamin de Piltover ?",
        characterImage: `${basePath}/Darius.webp`,
        characterPosition: "center",
      },
      {
        speaker: "Lysandor",
        text: "(Murmure) On ne peut pas le combattre. Il faut fuir Azhari.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "right",
      },
    ],
    nextId: "chapter2_fail",
  },

  chapter1_rammus: {
    id: "chapter1_rammus",
    background: `${basePath}/viewImmortalBastionFromInside.webp`,
    lines: [
      {
        speaker: "Darius",
        text: "Tu crois me faire avaler ça ? Ce Rammus est mort depuis un mois.",
        characterImage: `${basePath}/Darius.webp`,
        characterPosition: "center",
      },
      {
        speaker: "Lysandor",
        text: "(Murmure) On ne peut pas le combattre. Il faut fuir Azhari.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "right",
      },
    ],
    nextId: "chapter2_fail",
  },

  chapter2_success: {
    id: "chapter2_success",
    background: `${basePath}/viewRandomNoxusGate.webp`,
    lines: [
      {
        speaker: "Azhari",
        text: "C’est donc ça, franchir l’Empire… Ce n’est pas une victoire. C’est un arrachement.",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "On ne quitte jamais vraiment Noxus. On s’arrache à elle comme on s’arracherait un bout d’âme infectée.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Contrebandier",
        text: "Vous avez fait vite. Ou alors, vous avez fui avec l’urgence de ceux qui n’ont plus rien à perdre.",
        characterImage: `${basePath}/Contrebandier.webp`,
        characterPosition: "right",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "Qui es-tu ? Et comment sais-tu qui nous sommes ?",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Contrebandier",
        text: "Je suis un passeur. Rien de plus. Je sais ce que je dois savoir. Et je suis là pour vous proposer une chose simple : un passage sûr, discret… à condition de m’écouter.",
        characterImage: `${basePath}/Contrebandier.webp`,
        characterPosition: "right",
        characterFlip: true,
      },
      {
        speaker: "Azhari",
        text: "Et pourquoi t’aiderait-on à prix inconnu ?",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Contrebandier",
        text: "Parce que si vous refusez, je repars. Et mon prochain arrêt s’appelle Quartiers Noirs. Là où un certain Grand Général aime qu’on lui rapporte ce que ses chiens n’ont pas su attraper.",
        characterImage: `${basePath}/Contrebandier.webp`,
        characterPosition: "right",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "Swain...",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Contrebandier",
        text: "Je vous propose un marché. Vous m’offrez un peu d’or, ou quelque chose de plus... symbolique. En échange, je vous accompagne au-delà des Montagnes de Varjus et j’oublie que vous êtes passés. Puis vous continuerez par bateau de Rokrund à Zaun, par vos propres moyens.",
        characterImage: `${basePath}/Contrebandier.webp`,
        characterPosition: "right",
        characterFlip: true,
      },
      {
        speaker: "Azhari",
        text: "Et si on refuse ?",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Contrebandier",
        text: "Alors le nom de Lysandor, deviendra une rumeur. Puis un ordre. Et ensuite… une cible.",
        characterImage: `${basePath}/Contrebandier.webp`,
        characterPosition: "right",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "On doit choisir entre payer le prix ou la traque.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
    ],
    choices: [
      { text: "Payer le Contrebandier", nextId: "chapter3_pay" },
      { text: "Refuser et fuir seuls", nextId: "chapter3_refuse" },
    ],
  },

  chapter2_fail: {
    id: "chapter2_fail",
    background: `${basePath}/viewRandomNoxusGate.webp`,
    lines: [
      {
        speaker: "Azhari",
        text: "C’est donc ça, franchir l’Empire… Ce n’est pas une victoire. C’est un arrachement.",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "On ne quitte jamais vraiment Noxus. On s’arrache à elle comme on s’arracherait un bout d’âme infectée.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Contrebandier",
        text: "Vous avez fait vite. Ou alors, vous avez fui avec l’urgence de ceux qui n’ont plus rien à perdre.",
        characterImage: `${basePath}/Contrebandier.webp`,
        characterPosition: "right",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "Qui es-tu ? Et comment sais-tu qui nous sommes ?",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Contrebandier",
        text: "Je suis un passeur. Rien de plus. Je sais ce que je dois savoir. Et je suis là pour vous proposer une chose simple : un passage sûr, discret… à condition de m’écouter.",
        characterImage: `${basePath}/Contrebandier.webp`,
        characterPosition: "right",
        characterFlip: true,
      },
      {
        speaker: "Azhari",
        text: "Et pourquoi t’aiderait-on à prix inconnu ?",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Contrebandier",
        text: "Parce que si vous refusez, je repars. Et mon prochain arrêt s’appelle Quartiers Noirs. Là où un certain Grand Général aime qu’on lui rapporte ce que ses chiens n’ont pas su attraper.",
        characterImage: `${basePath}/Contrebandier.webp`,
        characterPosition: "right",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "Swain...",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Contrebandier",
        text: "Je vous propose un marché. Vous m’offrez un peu d’or, ou quelque chose de plus... symbolique. En échange, je vous accompagne au-delà des Montagnes de Varjus et j’oublie que vous êtes passés. Puis vous continuerez par bateau de Rokrund à Zaun, par vos propres moyens.",
        characterImage: `${basePath}/Contrebandier.webp`,
        characterPosition: "right",
        characterFlip: true,
      },
      {
        speaker: "Azhari",
        text: "Et si on refuse ?",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Contrebandier",
        text: "Alors le nom de Lysandor, deviendra une rumeur. Puis un ordre. Et ensuite… une cible.",
        characterImage: `${basePath}/Contrebandier.webp`,
        characterPosition: "right",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "On doit choisir entre payer le prix ou la traque.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
    ],
    choices: [
      { text: "Payer le Contrebandier", nextId: "chapter3_refuse" },
      { text: "Refuser et fuir seuls", nextId: "chapter3_refuse" },
    ],
  },

  // --- CHAPITRE 3 : S'ILS ONT PAYÉ (AZHARI SURVIT) ---

  chapter3_pay: {
    id: "chapter3_pay",
    background: `${basePath}/viewZaunDownSide.webp`,
    lines: [
      {
        speaker: "Narrateur",
        text: "Grâce à l'aide du contrebandier, vous avez traversé la mer sains et saufs. Vous arrivez enfin dans les bas-fonds toxiques de Zaun. Là, une jeune fille nommée Nika vous aborde.",
        characterPosition: "center",
      },
      {
        speaker: "Nika",
        text: "Je connais les chemins qui mènent à la ville haute. Je peux vous faire entrer à Piltover... si vous acceptez mon marché.",
        characterImage: `${basePath}/Nika.webp`,
        characterPosition: "right",
      },
    ],
    choices: [
      {
        text: "Accepter l'aide de Nika",
        nextId: "chapter3_pay_accept",
      },
      {
        text: "Refuser et se débrouiller seuls",
        nextId: "chapter3_pay_refuse",
      },
    ],
  },

  chapter3_pay_accept: {
    id: "chapter3_pay_accept",
    background: `${basePath}/viewZaunDownSide.webp`,
    lines: [
      {
        speaker: "Nika",
        text: "Vraiment, vous avez accepté mon marché ?! Vous allez en suer !",
        characterImage: `${basePath}/Nika.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Lysandor",
        text: "Tant qu'on rejoint bientôt Piltover ça nous va !",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Azhari",
        text: "J'ai hâte d'atteindre cette nouvelle vie !",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
    ],
    nextId: "chapter4_fin2",
  },

  chapter3_pay_refuse: {
    id: "chapter3_pay_refuse",
    background: `${basePath}/viewZaunDownSide.webp`,
    lines: [
      {
        speaker: "Azhari",
        text: "Je ne sais pas si on peut lui faire confiance...",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "On peut essayer de se débrouiller par nous-mêmes, tu as raison !",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Nika",
        text: "Vraiment vous refusez mon aide ?! Vous faites une grave erreur.",
        characterImage: `${basePath}/Nika.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
    ],
    nextId: "chapter4_fin1",
  },

  // --- CHAPITRE 3 : S'ILS ONT REFUSÉ (AZHARI EST MORT) ---

  chapter3_refuse: {
    id: "chapter3_refuse",
    background: `${basePath}/viewZaunDownSideFocused.webp`,
    lines: [
      {
        speaker: "Narrateur",
        text: "Ayant refusé de payer le contrebandier, vous avez été impitoyablement traqués par les limiers de Swain. Dans le chaos de votre fuite désespérée vers Zaun, Azhari a perdu la vie...",
        characterPosition: "center",
      },
      {
        speaker: "Lysandor",
        text: "Piltover... si proche, et pourtant, je suis toujours là. Six mois à Zaun, et je ne sais plus si je grimpe ou si je coule.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Teeva",
        text: "Zaun change ceux qui y survivent. Elle teste, elle brise, mais parfois… elle révèle.",
        characterImage: `${basePath}/Teeva.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Lysandor",
        text: "L’écho d’Azhari me suit. Comme un murmure entre les conduits. Il aurait su quoi faire...",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Teeva",
        text: "Il t’a laissé ses rêves, mais la route est désormais la tienne. Ne reste pas figé dans ses pas.",
        characterImage: `${basePath}/Teeva.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Lysandor",
        text: "Piltover nous fascinait. La cité des idées. Mais aujourd’hui, c’est Zaun qui me confronte à la réalité.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Teeva",
        text: "Là-haut, la lumière est forte. Ici, l’ombre t’enseigne. Où veux-tu ouvrir les yeux ?",
        characterImage: `${basePath}/Teeva.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Lysandor",
        text: "Les yeux de Nika ont croisé les miens l’autre jour. Un regard, et toutes mes certitudes vacillent. Quelque chose d’indicible…",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Teeva",
        text: "Ce genre de rencontres ne sont jamais anodines. Peut-être Zaun t’envoie un message ?",
        characterImage: `${basePath}/Teeva.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Lysandor",
        text: "J’y ai vu une faille dans ma douleur. Une promesse. Ou une fuite ? Je n’en sais rien.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Teeva",
        text: "Piltover offre un avenir construit. Zaun, un avenir à construire. Le confort ou le combat.",
        characterImage: `${basePath}/Teeva.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Lysandor",
        text: "Ce choix me ronge. Rester avec ce qui commence ici… ou monter là-haut, avec ses fantômes.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Teeva",
        text: "N’oublie pas : ce n’est pas la ville qui donne du sens, mais ceux qui y marchent avec toi.",
        characterImage: `${basePath}/Teeva.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Nika",
        text: "Si tu choisis l’ombre, je marcherai à tes côtés. Mais si ton cœur monte vers Piltover… je le comprendrai.",
        characterImage: `${basePath}/Nika.webp`,
        characterPosition: "right",
        characterFlip: true,
      },
      {
        speaker: "Lysandor",
        text: "Nika… j’ignorais que tu étais encore là.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Nika",
        text: "J’ai toujours été là. Parfois, il faut juste bien ouvrir les yeux, même dans les sombres profondeurs.",
        characterImage: `${basePath}/Nika.webp`,
        characterPosition: "right",
      },
    ],
    choices: [
      {
        text: "Rester à Zaun avec Nika",
        nextId: "chapter4_fin3",
      },
      {
        text: "Partir à Piltover sans Azhari",
        nextId: "chapter4_fin4",
      },
    ],
  },

  // FIN 1 : Azhari Alive, mais refus de l'aide de Nika -> Lysandor meurt
  chapter4_fin1: {
    id: "chapter4_fin1",
    background: `${basePath}/viewPiltoverDownSide.webp`,
    lines: [
      {
        speaker: "Nika",
        text: "Voilà où vos choix vous ont mené. Piltover t’attend… seul.",
        characterImage: `${basePath}/Nika.webp`,
        characterPosition: "left",
      },
      {
        speaker: "Azhari",
        text: "Lysandor, je suis là. Mais sans toi, la lumière de cette cité me paraît bien terne.",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "right",
      },
    ],
    nextId: "epilogue1",
  },

  epilogue1: {
    id: "epilogue1",
    background: `${basePath}/viewPiltoverFocused.webp`,
    lines: [
      {
        speaker: "Narrateur",
        text: "Le vent de Piltover souffle sur un homme seul. Azhari, porteur de mémoires et de blessures, a perdu plus qu’un compagnon : un idéal. Dans la cité dorée, il s’efforce de faire vivre la voix d’un exilé tombé trop tôt.",
        characterPosition: "center",
      },
      {
        speaker: "Azhari",
        text: "« Même seul, je continuerai à écrire ce que nous avons commencé. »",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "center",
      },
    ],
    nextId: "credits",
  },

  // FIN 2 : Azhari Alive + Accepté l'aide de Nika -> Les 3 survivent
  chapter4_fin2: {
    id: "chapter4_fin2",
    background: `${basePath}/viewPiltoverDownSide.webp`,
    lines: [
      {
        speaker: "Lysandor",
        text: "Trois mois de survie à Zaun... mais enfin, voici Piltover.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Nika",
        text: "Cette cité est peut-être votre chance. Ou votre nouveau défi. À bientôt peut-être.",
        characterImage: `${basePath}/Nika.webp`,
        characterPosition: "left",
      },
      {
        speaker: "Azhari",
        text: "Ensemble, on saura y tracer notre chemin.",
        characterImage: `${basePath}/AzhariShen.webp`,
        characterPosition: "right",
      },
    ],
    nextId: "epilogue2",
  },

  epilogue2: {
    id: "epilogue2",
    background: `${basePath}/viewPiltoverInnovationPark.webp`,
    lines: [
      {
        speaker: "Narrateur",
        text: "Après trois mois de ténèbres à Zaun, Azhari et Lysandor posent enfin le pied à Piltover. Ensemble. Leurs cicatrices ne les quittent pas, mais un lien les unit désormais : celui de ceux qui ont choisi de croire, encore.",
        characterPosition: "center",
      },
      {
        speaker: "Lysandor",
        text: "« Nous n’avons pas tourné le dos à Noxus. Nous avons choisi un chemin que l’ambition seule ne pouvait offrir : un avenir. »",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "center",
      },
    ],
    nextId: "credits",
  },

  // FIN 3 : Azhari Mort + Accepté l'offre de Nika -> Rester à Zaun
  chapter4_fin3: {
    id: "chapter4_fin3",
    background: `${basePath}/viewPiltoverDownSide.webp`,
    lines: [
      {
        speaker: "Lysandor",
        text: "Piltover est belle… mais je préfère bâtir ma vie ici, dans l’ombre de Zaun.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Nika",
        text: "Tu trouveras plus qu’un abri ici. Tu trouveras une famille.",
        characterImage: `${basePath}/Nika.webp`,
        characterPosition: "right",
      },
    ],
    nextId: "epilogue3",
  },
  epilogue3: {
    id: "epilogue3",
    background: `${basePath}/viewZaunUpSide.webp`,
    lines: [
      {
        speaker: "Narrateur",
        text: "La poussière de Zaun recouvre les souvenirs. Nika et Lysandor y construisent un foyer discret, loin des promesses de grandeur. Dans l’ombre, ils réparent ce qui peut encore l’être.",
        characterPosition: "center",
      },
      {
        speaker: "Nika",
        text: "« Certains cherchent la lumière. D’autres deviennent la flamme dans la nuit. »",
        characterImage: `${basePath}/Nika.webp`,
        characterPosition: "center",
      },
    ],
    nextId: "credits",
  },

  // FIN 4 : Azhari Mort + Refusé Nika -> Lysandor va seul à Piltover
  chapter4_fin4: {
    id: "chapter4_fin4",
    background: `${basePath}/viewPiltoverDownSide.webp`,
    lines: [
      {
        speaker: "Lysandor",
        text: "Piltover… peut-être qu'ici, je trouverai le sens à tout ça.",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "left",
        characterFlip: true,
      },
      {
        speaker: "Teeva",
        text: "Garde ton cap, mais reste méfiant. Ici, même la lumière peut aveugler.",
        characterImage: `${basePath}/Teeva.webp`,
        characterPosition: "right",
      },
      {
        speaker: "Nika",
        text: "J’aurais voulu que tu restes. Mais je comprends… adieu, Lysandor.",
        characterImage: `${basePath}/Nika.webp`,
        characterPosition: "right",
      },
    ],
    nextId: "credits",
  },
  epilogue4: {
    id: "epilogue4",
    background: `${basePath}/viewPiltoverMainStreet.webp`,
    lines: [
      {
        speaker: "Narrateur",
        text: "Piltover s’élève, fière et lumineuse. Lysandor y marche seul, le cœur lesté d’adieux. Ni Noxus, ni Zaun… mais peut-être une troisième voie. Une ville où ses erreurs ne seront pas oubliées, mais dépassées.",
        characterPosition: "center",
      },
      {
        speaker: "Lysandor",
        text: "« Ce n’est pas la cité qui me changera. C’est ce que j’y ferai. »",
        characterImage: `${basePath}/LysandorDuCouteau.webp`,
        characterPosition: "center",
      },
    ],
    nextId: "credits",
  },

  // ==========================================
  // CRÉDITS (ÉPILOGUE)
  // ==========================================
  credits: {
    id: "credits",
    background: `${basePath}/viewNoxusGateInShurima.webp`,
    lines: [
      {
        speaker: "Crédits",
        text: "Toutes les images, personnages, et éléments visuels utilisés dans cette histoire sont la propriété de Riot Games, de la franchise League of Legends et du studio Fortiche.",
        characterPosition: "center",
      },
      {
        speaker: "Crédits",
        text: "Ce projet est une œuvre de fan, non officielle, réalisée dans le cadre d’un projet de fin de première année, sans but commercial. Nous remercions Riot Games pour leur univers riche et inspirant.",
        characterPosition: "center",
      },
      {
        speaker: "Crédits",
        text: "Les différents sprites de personnages ont été réalisés par I.A. et inspirées par les designs originaux du studio Fortiche.",
        characterPosition: "center",
      },
      {
        speaker: "Crédits",
        text: "Merci d'avoir joué. Choisissez bien… Chaque décision construit votre légende.",
        characterPosition: "center",
      },
    ],
  },
};
