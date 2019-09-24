package main

import (
	"fmt"
	"io/ioutil"
	"github.com/gorilla/mux"
	// "encoding/json"
	// "log"
	// "net/http"
)

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func readJSONFile(filename string) []byte {
	_file, err := ioutil.ReadFile(filename)
	check(err)
	return _file
}

funct testHandler(w http.ResponseWriter, r *http.Request) {
	var testFile = readJSONFile("./test.json")
	
}

func main() {
	var testFile = readJSONFile("./test.json")
	var r := mux.newRouter()

	fmt.Println(string(testFile))
}
