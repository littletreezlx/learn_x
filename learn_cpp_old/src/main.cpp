#include "glog/logging.h"
#include "gflags.h"
//#include "../glog/src/glog/logging.h"

int main(int argc, char *argv[]) {
    // Initialize Google’s logging library.
//    google::InitGoogleLogging(argv[0]);

    printf("123");
    google::InitGoogleLogging(argv[0]);
    // ...
//    LOG(INFO) << "Found";
//    LOG(WARNING) << "Found";
    LOG(ERROR) << "Found";
}




//#include <iostream>
//#include <string>
//#include "absl/strings/str_cat.h"
//
//int main() {
//    std::string str1 = "Hello";
//    std::string str2 = "Abseil";
//    std::string str3 = "!";
//
//    // 使用 absl::StrCat 进行字符串拼接
//    std::string result = absl::StrCat(str1, ", ", str2, str3);
//
//    // 输出拼接结果
//    std::cout << result << std::endl;
//
//    return 0;
//}
