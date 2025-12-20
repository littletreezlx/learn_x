cmake_minimum_required(VERSION 3.27)
project(CppTest)
set(CMAKE_CXX_STANDARD 17)


add_subdirectory(third/glog)
add_executable(CppTest src/main.cpp)
#find_package(glog REQUIRED)
#target_link_libraries(CppTest PUBLIC glog::glog)
target_link_libraries(CppTest PUBLIC glog)
target_link_directories(CppTest PUBLIC ${CMAKE_SOURCE_DIR}/src/include)

