@ {
  200 CG ADD 1 GE2018/SIDEBAR-ANI 0 <templateData></templateData>
}

@Q Show {
  200 CG PLAY 1
}

@SCENESTOP 200 test {
  # Fade out, to make sure the shadow edge cut isnt visible
  # TODO - need to figure out how to stop the shadow glitch
  100 MIXER OPACITY 0 5 Linear
}

# Wait for fade to finish, then clear
@DELAY 6 {
  100 CLEAR
}

# After clear has been done, swap the layers
@DELAY 2 {
  100 SWAP 1-200 TRANSFORMS
}
