// src/sites.cjs
module.exports = [
  {
    name: 'TekkenMods',
    url: 'https://tekkenmods.com',
    categories: [
      { name: 'Characters', path: '/search?category=1&sort=1' },
      { name: 'Stages', path: '/search?category=2&sort=1' },
      { name: 'New', path: '/search?category=0&sort=1' }
    ]
  },
  {
    name: 'OtherModSite',
    url: 'https://othermodsite.com',
    categories: [
      { name: 'Skins', path: '/skins' },
      { name: 'Animations', path: '/animations' }
    ]
  }
];
