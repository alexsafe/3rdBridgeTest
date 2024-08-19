# Notes

### Header
- The Pokemon image: Not yet done. I would probably use a library for animation like reanimated or react-native-shared-element.I chose to leave the default to the small upper right corner.

### Navigation
- For the navigation I stacked everything. I added an easy way to navigate back to the list by clicking on the title. It's commented due to the fact that the <Link would mess up the layout.

### Details
- I didn' find the exact sprites for the types so I chose one by myself, even if it doesn't fit the Figma.
- Also, see ###Header :)

### Known TODOs
- more tests
- more exhaustive error handing
- more attention to edge cases: Api temporarily not available, wrong request, too many requests, etc. I would try and give the user the most precise errors possible.
- improve the usage of types



# Instructions

- Please fork this repo on your preferred git source
- Details of what is asked is all here, in the README
- Take all the time you need
- We'll exchange feedback when you're done
- If you have any questions, feel free to contact us
- Have fun!

---
---
---

> 💯 The technical test is the equivalent of user story.

# **💡 Context**

In POKE-1, the infinite list was implemented. We now have the `Pokemons` page, with all Pokemons listed. Not a lot of information is available though, so we need a screen to list the details of a Pokemon.

# **✅ Acceptance criteria**

### Header

> 💡 You may or may not need to change the `PageContainer` component

- We need to see the image of the Pokemon.
    - When scroll is at 0, the image is centered and takes ~25% of the screen height.
    - When scrolling, it gradually (with an animation) moves to the top right to be ~32x32.
- The name of the Pokemon should be at the top center of the header, no animations.

### Content

- The content of the page should contain three sections:
    1. The types of the Pokemon
    2. The first 5 moves of the Pokemon
    3. The Pokemon evolutions
        - They should be pressable, and by pressing them we should navigate to the details screen of this Pokemon.

# ℹ️ Additional information

- Loading states are up to you
- Architecture is up to you
- File structure is up to you
- Libraries used are up to you

# 💻 Technical details

- For image:
    - use the `front_default` image from the `sprites` attributes on `https://pokeapi.co/api/v2/pokemon/${id}`
- For type:
    - `types` attribute on `https://pokeapi.co/api/v2/pokemon/${id}`
- For moves
    - `moves` attribute on `https://pokeapi.co/api/v2/pokemon/${id}`
- For evolutions
    - Fetch the `pokemon-species` from `https://pokeapi.co/api/v2/pokemon-species/${id}`
    - Fetch the according `evolution_chain.url`
    - The result is a nested `chain` of evolutions
        - Get the id from the `species.url` and the name to build the evolution’s UI card
        - Filter out the Pokemon that is currently displayed

# 💅🏻 Design files

https://www.figma.com/file/QONuuN2K6TuUZ6OqRmwtS0/Pokemon-details?type=design&node-id=0-1&mode=design&t=Gb22Mil3mNeqYAg1-0
