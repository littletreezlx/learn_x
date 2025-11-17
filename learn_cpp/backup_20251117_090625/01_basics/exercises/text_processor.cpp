#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>
#include <cctype>

// 函数声明
void showMenu();
void processFile(const std::string& filename);
void displayStatistics(const std::vector<std::string>& lines);
void searchText(const std::vector<std::string>& lines);
void countWords(const std::vector<std::string>& lines);
std::string toLowerCase(const std::string& str);
int countWordOccurrences(const std::vector<std::string>& lines, const std::string& word);

int main() {
    std::cout << "=== 文本处理工具 ===" << std::endl;
    std::cout << "这个程序可以读取文本文件并进行基本的文本分析" << std::endl;
    
    std::string filename;
    std::cout << "\n请输入要处理的文件名: ";
    std::getline(std::cin, filename);
    
    processFile(filename);
    
    return 0;
}

void showMenu() {
    std::cout << "\n=== 文本处理菜单 ===" << std::endl;
    std::cout << "1. 显示文件统计信息" << std::endl;
    std::cout << "2. 搜索文本" << std::endl;
    std::cout << "3. 统计单词出现次数" << std::endl;
    std::cout << "4. 退出" << std::endl;
    std::cout << "请选择操作 (1-4): ";
}

void processFile(const std::string& filename) {
    // 尝试打开文件
    std::ifstream file(filename);
    
    if (!file.is_open()) {
        std::cout << "错误: 无法打开文件 '" << filename << "'" << std::endl;
        std::cout << "请确保文件存在且路径正确。" << std::endl;
        return;
    }
    
    // 读取文件内容
    std::vector<std::string> lines;
    std::string line;
    
    std::cout << "\n正在读取文件..." << std::endl;
    
    while (std::getline(file, line)) {
        lines.push_back(line);
    }
    
    file.close();
    
    if (lines.empty()) {
        std::cout << "文件为空或无法读取内容。" << std::endl;
        return;
    }
    
    std::cout << "文件读取完成！共 " << lines.size() << " 行。" << std::endl;
    
    // 主循环
    int choice;
    do {
        showMenu();
        
        if (!(std::cin >> choice)) {
            std::cout << "输入无效！请输入数字。" << std::endl;
            std::cin.clear();
            std::cin.ignore(10000, '\n');
            continue;
        }
        
        std::cin.ignore(); // 清理换行符
        
        switch (choice) {
            case 1:
                displayStatistics(lines);
                break;
            case 2:
                searchText(lines);
                break;
            case 3:
                countWords(lines);
                break;
            case 4:
                std::cout << "退出程序。" << std::endl;
                break;
            default:
                std::cout << "无效选择！请输入 1-4。" << std::endl;
                break;
        }
        
    } while (choice != 4);
}

void displayStatistics(const std::vector<std::string>& lines) {
    std::cout << "\n=== 文件统计信息 ===" << std::endl;
    
    int totalLines = lines.size();
    int totalCharacters = 0;
    int totalWords = 0;
    int nonEmptyLines = 0;
    int longestLineLength = 0;
    
    for (const auto& line : lines) {
        totalCharacters += line.length();
        
        if (!line.empty()) {
            ++nonEmptyLines;
        }
        
        if (line.length() > longestLineLength) {
            longestLineLength = line.length();
        }
        
        // 简单的单词计数（以空格分隔）
        bool inWord = false;
        for (char c : line) {
            if (std::isspace(c)) {
                inWord = false;
            } else if (!inWord) {
                inWord = true;
                ++totalWords;
            }
        }
    }
    
    std::cout << "总行数: " << totalLines << std::endl;
    std::cout << "非空行数: " << nonEmptyLines << std::endl;
    std::cout << "总字符数: " << totalCharacters << std::endl;
    std::cout << "总单词数: " << totalWords << std::endl;
    std::cout << "最长行的字符数: " << longestLineLength << std::endl;
    
    if (totalLines > 0) {
        std::cout << "平均每行字符数: " << (double)totalCharacters / totalLines << std::endl;
    }
    
    if (nonEmptyLines > 0) {
        std::cout << "平均每行单词数: " << (double)totalWords / totalLines << std::endl;
    }
}

void searchText(const std::vector<std::string>& lines) {
    std::string searchTerm;
    std::cout << "\n请输入要搜索的文本: ";
    std::getline(std::cin, searchTerm);
    
    if (searchTerm.empty()) {
        std::cout << "搜索词不能为空！" << std::endl;
        return;
    }
    
    std::cout << "\n搜索结果:" << std::endl;
    
    bool found = false;
    std::string lowerSearchTerm = toLowerCase(searchTerm);
    
    for (size_t i = 0; i < lines.size(); ++i) {
        std::string lowerLine = toLowerCase(lines[i]);
        
        if (lowerLine.find(lowerSearchTerm) != std::string::npos) {
            found = true;
            std::cout << "第 " << (i + 1) << " 行: " << lines[i] << std::endl;
        }
    }
    
    if (!found) {
        std::cout << "未找到包含 '" << searchTerm << "' 的行。" << std::endl;
    }
}

void countWords(const std::vector<std::string>& lines) {
    std::string word;
    std::cout << "\n请输入要统计的单词: ";
    std::getline(std::cin, word);
    
    if (word.empty()) {
        std::cout << "单词不能为空！" << std::endl;
        return;
    }
    
    int count = countWordOccurrences(lines, word);
    std::cout << "单词 '" << word << "' 在文件中出现了 " << count << " 次。" << std::endl;
}

std::string toLowerCase(const std::string& str) {
    std::string result = str;
    std::transform(result.begin(), result.end(), result.begin(), 
                   [](unsigned char c) { return std::tolower(c); });
    return result;
}

int countWordOccurrences(const std::vector<std::string>& lines, const std::string& word) {
    int count = 0;
    std::string lowerWord = toLowerCase(word);
    
    for (const auto& line : lines) {
        std::string lowerLine = toLowerCase(line);
        
        // 简单的单词匹配（这里可以改进为更精确的单词边界匹配）
        size_t pos = 0;
        while ((pos = lowerLine.find(lowerWord, pos)) != std::string::npos) {
            // 检查是否为完整单词（前后是非字母字符）
            bool isWordStart = (pos == 0 || !std::isalnum(lowerLine[pos - 1]));
            bool isWordEnd = (pos + lowerWord.length() == lowerLine.length() || 
                              !std::isalnum(lowerLine[pos + lowerWord.length()]));
            
            if (isWordStart && isWordEnd) {
                ++count;
            }
            
            pos += lowerWord.length();
        }
    }
    
    return count;
}