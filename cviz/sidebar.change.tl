@ {
  200 MIXER FILL 0.52 0 1 1 1 Linear
  201 MIXER FILL 0.364 0 1 1 1 Linear
  200 LOADBG GE2016/BGLOOP2
  201 CG ADD 0 http://10.42.13.111:8080/sidebar.html 1 @data
}

@Q Show {
  200 MIXER FILL 0.156 0 1 1 54 Linear DEFER
  201 MIXER FILL 0 0 1 1 54 Linear DEFER
  
  200 LOOP

  0 MIXER COMMIT
}

# Wait for animation time + a couple to be safe
@DELAY 56 {
  # Fade out, to make sure the shadow edge cut isnt visible
  # TODO - should shadow be a seperate layer to remove this possible visual glitch?
  100 MIXER OPACITY 0 5 Linear
  101 MIXER OPACITY 0 5 Linear
}

# Wait for fade to finish, then clear
@DELAY 6 {
  100 CLEAR
  101 CLEAR
  100 MIXER CLEAR
  101 MIXER CLEAR
}

# After clear has been done, swap the layers
@DELAY 2 {
  100 SWAP 1-200 TRANSFORMS
  101 SWAP 1-201 TRANSFORMS
}
