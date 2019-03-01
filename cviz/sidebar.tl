@ {
	100 CG ADD 1 GE2018/SIDEBAR-ANI 0 @data
}
@CUE Show {
	100 CG PLAY 1
}
@DELAY 7 {
	ATEM MACRO RUN 98
#	HTTP POST http://10.42.13.110:5000/api/player/run/0

}

@RUNCHILDORCUE change Clear {
	100 CG NEXT 1
}
@DELAY 6 {
	ATEM MACRO RUN 99
#	HTTP POST http://10.42.13.110:5000/api/player/run/1
}

# wait for end of scene
@END 100 {
}