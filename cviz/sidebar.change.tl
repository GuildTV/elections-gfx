@ {
  200 CG ADD 1 GE2018/SIDEBAR-ANI 0 @data
  200 MIXER CLIP 0.66667 0 1 1
}

@Q Show {
  200 CG PLAY 1
}

@SCENESTOP 200 test {
  # Fade out, to make sure the shadow edge cut isnt visible
  200 MIXER CLIP 0 0 1 1 DEFER

  100 MIXER OPACITY 0 1 Linear DEFER

  0 MIXER COMMIT
}

# Wait for fade to finish, then clear
@DELAY 6 {
  100 CLEAR
}

# After clear has been done, swap the layers
@DELAY 2 {
  100 SWAP 1-200 TRANSFORMS
}
