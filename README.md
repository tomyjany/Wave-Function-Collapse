# Wave-Function-Collapse
Simple Javascript program, that creates random terrain with 5 different tiles
# How to use?
Download all files and open index.html.
Please enter how big the generated structure will be, 10 by 10 works fine.

If you want to generate different structure with the same size, you can just reload your web page with F5.

# How does it work?

There is simple algorhitm that uses backtracking to find viable structure. Program starts building from right bottom corner and backtracks till all tiles are filled in.
Tile, that will be filled in, is selected randomly.
I have decided to have borders restriction free, so they fit with every tile. I did this because otherwise the structures werent that much interesting and the backtracking was taking way too long.
T
