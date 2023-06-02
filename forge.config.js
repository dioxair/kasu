module.exports = {
  packagerConfig: {
    icon: "C:\\Users\\Plextora\\source\\repos\\kasu\\out\\Icon stuff\\ICO\\KasuLogo",
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "Kasu",
        iconUrl: "http://files.dioxair.me/r/KasuLogo.ico",
        setupIcon:
          "C:\\Users\\Plextora\\source\\repos\\kasu\\out\\Icon stuff\\ICO\\KasuLogo.ico",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          maintainer: "Samuel Olagunju",
          homepage: "https://github.com/dioxair/kasu",
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
          homepage: "https://github.com/dioxair/kasu",
        },
      },
    },
  ],
};
