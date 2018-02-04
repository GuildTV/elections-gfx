@ {
	200 CG ADD 0 @type 0 @data
}
@CUE Show {
	200 CG PLAY 0
}

@15 200 {
# Wait for stop
}

@RUNCHILDORCUE change Clear {
	200 CG STOP 0
}

# wait for end of scene
@END 200 {
}