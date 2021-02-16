

export const goDemoCode = `
package main
import "fmt"
func main(){
    var line string
	var err error
	for err==nil {
		_, err = fmt.Scanln(&line)
		fmt.Println("=>", line)
	}
}
`

export const goDemoInput = `abcde
efghijk
123123123
2!@#%$^&%&*`


export const cppDemoCode = `#include <iostream>
using namespace std;
 
int main() 
{
	int a, b;
	cin >> a >> b;
    cout << a + b;
    return 0;
}
`
export const cppDemoInput = '199 299'

export const cDemoCode = `#include <stdio.h>
int main() {
   int times;
   scanf("%d", &times);
   for (int i=0; i<times; i++) {
	printf("Hello, World!\\n");
   }
   return 0;
}
`

export const cDemoInput = '10'