

export const goDemoCode = '\
package main\n\
import "fmt"\n\
func main(){\n\
    var line string\n\
	var err error\n\
	for err==nil {\n\
		_, err = fmt.Scanln(&line)\n\
		fmt.Println("=>", line)\n\
	}\n\
}\n\
'

export const goDemoInput = '\
abcde\n\
efghijk\n\
123123123\n\
2!@#%$^&%&*\n'