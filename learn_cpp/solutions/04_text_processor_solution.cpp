/*
 * 文本处理工具解答
 * 
 * 学习要点：
 * 1. 文件I/O操作 (ifstream, ofstream)
 * 2. STL容器的使用 (vector, map)
 * 3. 字符串处理和算法
 * 4. 异常处理和错误检查
 * 5. 函数式编程特性 (lambda表达式)
 */

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <map>
#include <algorithm>
#include <cctype>
#include <sstream>
#include <iomanip>

class TextProcessor {
private:
    std::vector<std::string> lines;
    std::string filename;
    
public:
    explicit TextProcessor(const std::string& file) : filename(file) {}
    
    bool loadFile() {
        std::ifstream file(filename);
        
        if (!file.is_open()) {
            std::cout << "错误: 无法打开文件 '" << filename << "'" << std::endl;
            return false;
        }
        
        lines.clear();
        std::string line;
        
        while (std::getline(file, line)) {
            lines.push_back(line);
        }
        
        file.close();
        std::cout << "成功加载文件，共 " << lines.size() << " 行。" << std::endl;
        return true;
    }
    
    void run() {
        if (!loadFile()) {
            return;
        }
        
        int choice;
        do {
            showMenu();
            choice = getChoice();
            
            switch (choice) {
                case 1: showBasicStatistics(); break;
                case 2: showAdvancedStatistics(); break;
                case 3: searchText(); break;
                case 4: searchWithRegex(); break;
                case 5: wordFrequencyAnalysis(); break;
                case 6: exportStatistics(); break;
                case 7: findLongestWords(); break;
                case 8: analyzeReadability(); break;
                case 9: std::cout << "退出程序。" << std::endl; break;
                default: std::cout << "无效选择！" << std::endl; break;
            }
            
        } while (choice != 9);
    }
    
private:
    void showMenu() {
        std::cout << "\n=== 高级文本处理工具 ===" << std::endl;
        std::cout << "1. 基本统计信息" << std::endl;
        std::cout << "2. 高级统计信息" << std::endl;
        std::cout << "3. 文本搜索" << std::endl;
        std::cout << "4. 正则表达式搜索" << std::endl;
        std::cout << "5. 词频分析" << std::endl;
        std::cout << "6. 导出统计报告" << std::endl;
        std::cout << "7. 查找最长单词" << std::endl;
        std::cout << "8. 可读性分析" << std::endl;
        std::cout << "9. 退出" << std::endl;
        std::cout << "请选择 (1-9): ";
    }
    
    int getChoice() {
        int choice;
        while (!(std::cin >> choice) || choice < 1 || choice > 9) {
            std::cout << "无效输入！请输入1-9: ";
            std::cin.clear();
            std::cin.ignore(10000, '\n');
        }
        std::cin.ignore(); // 清理换行符
        return choice;
    }
    
    void showBasicStatistics() {
        std::cout << "\n=== 基本统计信息 ===" << std::endl;
        
        int totalLines = lines.size();
        int totalChars = 0;
        int totalWords = 0;
        int nonEmptyLines = 0;
        
        for (const auto& line : lines) {
            totalChars += line.length();
            if (!line.empty()) ++nonEmptyLines;
            totalWords += countWords(line);
        }
        
        std::cout << "总行数: " << totalLines << std::endl;
        std::cout << "非空行数: " << nonEmptyLines << std::endl;
        std::cout << "总字符数: " << totalChars << std::endl;
        std::cout << "总单词数: " << totalWords << std::endl;
        
        if (totalLines > 0) {
            std::cout << "平均每行字符数: " << std::fixed << std::setprecision(2) 
                      << (double)totalChars / totalLines << std::endl;
            std::cout << "平均每行单词数: " << std::fixed << std::setprecision(2) 
                      << (double)totalWords / totalLines << std::endl;
        }
    }
    
    void showAdvancedStatistics() {
        std::cout << "\n=== 高级统计信息 ===" << std::endl;
        
        std::map<char, int> charFreq;
        std::map<int, int> lineLengthDist;
        int totalSentences = 0;
        int totalParagraphs = 0;
        bool inParagraph = false;
        
        for (const auto& line : lines) {
            // 字符频率统计
            for (char c : line) {
                if (std::isalpha(c)) {
                    charFreq[std::tolower(c)]++;
                }
            }
            
            // 行长度分布
            int length = line.length();
            lineLengthDist[length / 10 * 10]++; // 按10字符分组
            
            // 句子统计
            totalSentences += countSentences(line);
            
            // 段落统计
            if (!line.empty()) {
                if (!inParagraph) {
                    totalParagraphs++;
                    inParagraph = true;
                }
            } else {
                inParagraph = false;
            }
        }
        
        std::cout << "总句子数: " << totalSentences << std::endl;
        std::cout << "总段落数: " << totalParagraphs << std::endl;
        
        // 显示最频繁的字符
        auto maxChar = std::max_element(charFreq.begin(), charFreq.end(),
            [](const auto& a, const auto& b) { return a.second < b.second; });
        
        if (maxChar != charFreq.end()) {
            std::cout << "最频繁字符: '" << maxChar->first << "' (出现 " 
                      << maxChar->second << " 次)" << std::endl;
        }
        
        // 行长度分布
        std::cout << "\n行长度分布:" << std::endl;
        for (const auto& pair : lineLengthDist) {
            std::cout << pair.first << "-" << (pair.first + 9) << " 字符: " 
                      << pair.second << " 行" << std::endl;
        }
    }
    
    void searchText() {
        std::string searchTerm;
        std::cout << "\n请输入搜索词: ";
        std::getline(std::cin, searchTerm);
        
        if (searchTerm.empty()) return;
        
        std::cout << "\n搜索结果 (忽略大小写):" << std::endl;
        
        int matchCount = 0;
        std::string lowerSearch = toLowerCase(searchTerm);
        
        for (size_t i = 0; i < lines.size(); ++i) {
            std::string lowerLine = toLowerCase(lines[i]);
            size_t pos = 0;
            
            while ((pos = lowerLine.find(lowerSearch, pos)) != std::string::npos) {
                if (matchCount == 0) {
                    std::cout << "第 " << (i + 1) << " 行: " << lines[i] << std::endl;
                    std::cout << "       ";
                    for (size_t j = 0; j < pos; ++j) std::cout << " ";
                    for (size_t j = 0; j < searchTerm.length(); ++j) std::cout << "^";
                    std::cout << std::endl;
                }
                matchCount++;
                pos += lowerSearch.length();
            }
        }
        
        std::cout << "\n共找到 " << matchCount << " 处匹配。" << std::endl;
    }
    
    void searchWithRegex() {
        std::string pattern;
        std::cout << "\n请输入搜索模式 (支持简单通配符 * 和 ?): ";
        std::getline(std::cin, pattern);
        
        if (pattern.empty()) return;
        
        std::cout << "\n模式匹配结果:" << std::endl;
        
        int matchCount = 0;
        for (size_t i = 0; i < lines.size(); ++i) {
            if (simpleWildcardMatch(lines[i], pattern)) {
                std::cout << "第 " << (i + 1) << " 行: " << lines[i] << std::endl;
                matchCount++;
            }
        }
        
        std::cout << "\n共找到 " << matchCount << " 行匹配模式。" << std::endl;
    }
    
    void wordFrequencyAnalysis() {
        std::cout << "\n=== 词频分析 ===" << std::endl;
        
        std::map<std::string, int> wordFreq;
        
        for (const auto& line : lines) {
            auto words = extractWords(line);
            for (const auto& word : words) {
                std::string lowerWord = toLowerCase(word);
                if (lowerWord.length() > 2) { // 只统计长度大于2的单词
                    wordFreq[lowerWord]++;
                }
            }
        }
        
        // 转换为vector并排序
        std::vector<std::pair<std::string, int>> sortedWords(wordFreq.begin(), wordFreq.end());
        std::sort(sortedWords.begin(), sortedWords.end(),
            [](const auto& a, const auto& b) { return a.second > b.second; });
        
        std::cout << "前20个最频繁单词:" << std::endl;
        std::cout << std::setw(15) << "单词" << std::setw(10) << "频率" << std::endl;
        std::cout << std::string(25, '-') << std::endl;
        
        for (size_t i = 0; i < std::min(20ul, sortedWords.size()); ++i) {
            std::cout << std::setw(15) << sortedWords[i].first 
                      << std::setw(10) << sortedWords[i].second << std::endl;
        }
        
        std::cout << "\n总唯一单词数: " << wordFreq.size() << std::endl;
    }
    
    void exportStatistics() {
        std::string exportFile = filename + "_stats.txt";
        std::ofstream out(exportFile);
        
        if (!out.is_open()) {
            std::cout << "无法创建导出文件！" << std::endl;
            return;
        }
        
        out << "文本统计报告\n";
        out << "=============\n\n";
        out << "文件名: " << filename << "\n";
        out << "生成时间: " << getCurrentTime() << "\n\n";
        
        // 重定向cout到文件，复用现有函数
        std::streambuf* orig = std::cout.rdbuf();
        std::cout.rdbuf(out.rdbuf());
        
        showBasicStatistics();
        showAdvancedStatistics();
        
        std::cout.rdbuf(orig); // 恢复cout
        out.close();
        
        std::cout << "统计报告已导出到: " << exportFile << std::endl;
    }
    
    void findLongestWords() {
        std::cout << "\n=== 最长单词分析 ===" << std::endl;
        
        std::vector<std::string> allWords;
        for (const auto& line : lines) {
            auto words = extractWords(line);
            allWords.insert(allWords.end(), words.begin(), words.end());
        }
        
        if (allWords.empty()) {
            std::cout << "未找到任何单词。" << std::endl;
            return;
        }
        
        // 按长度排序
        std::sort(allWords.begin(), allWords.end(),
            [](const std::string& a, const std::string& b) {
                return a.length() > b.length();
            });
        
        std::cout << "前10个最长单词:" << std::endl;
        for (size_t i = 0; i < std::min(10ul, allWords.size()); ++i) {
            std::cout << (i + 1) << ". " << allWords[i] 
                      << " (" << allWords[i].length() << " 字符)" << std::endl;
        }
    }
    
    void analyzeReadability() {
        std::cout << "\n=== 可读性分析 ===" << std::endl;
        
        int totalWords = 0;
        int totalSentences = 0;
        int totalSyllables = 0;
        
        for (const auto& line : lines) {
            auto words = extractWords(line);
            totalWords += words.size();
            totalSentences += countSentences(line);
            
            for (const auto& word : words) {
                totalSyllables += estimateSyllables(word);
            }
        }
        
        if (totalSentences == 0 || totalWords == 0) {
            std::cout << "无法分析：文本中没有足够的内容。" << std::endl;
            return;
        }
        
        // 简化的Flesch Reading Ease Score
        double avgWordsPerSentence = (double)totalWords / totalSentences;
        double avgSyllablesPerWord = (double)totalSyllables / totalWords;
        
        double readabilityScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
        
        std::cout << "平均每句单词数: " << std::fixed << std::setprecision(2) << avgWordsPerSentence << std::endl;
        std::cout << "平均每词音节数: " << std::fixed << std::setprecision(2) << avgSyllablesPerWord << std::endl;
        std::cout << "可读性分数: " << std::fixed << std::setprecision(1) << readabilityScore << std::endl;
        
        std::string readabilityLevel;
        if (readabilityScore >= 90) readabilityLevel = "非常容易";
        else if (readabilityScore >= 80) readabilityLevel = "容易";
        else if (readabilityScore >= 70) readabilityLevel = "相当容易";
        else if (readabilityScore >= 60) readabilityLevel = "标准";
        else if (readabilityScore >= 50) readabilityLevel = "相当困难";
        else if (readabilityScore >= 30) readabilityLevel = "困难";
        else readabilityLevel = "非常困难";
        
        std::cout << "可读性等级: " << readabilityLevel << std::endl;
    }
    
    // 辅助函数
    int countWords(const std::string& text) {
        std::istringstream iss(text);
        std::string word;
        int count = 0;
        while (iss >> word) count++;
        return count;
    }
    
    int countSentences(const std::string& text) {
        int count = 0;
        for (char c : text) {
            if (c == '.' || c == '!' || c == '?') count++;
        }
        return count;
    }
    
    std::string toLowerCase(const std::string& str) {
        std::string result = str;
        std::transform(result.begin(), result.end(), result.begin(), ::tolower);
        return result;
    }
    
    std::vector<std::string> extractWords(const std::string& text) {
        std::vector<std::string> words;
        std::string word;
        
        for (char c : text) {
            if (std::isalpha(c)) {
                word += c;
            } else {
                if (!word.empty()) {
                    words.push_back(word);
                    word.clear();
                }
            }
        }
        
        if (!word.empty()) {
            words.push_back(word);
        }
        
        return words;
    }
    
    bool simpleWildcardMatch(const std::string& text, const std::string& pattern) {
        // 简单的通配符匹配实现
        size_t textIndex = 0, patternIndex = 0;
        
        while (textIndex < text.length() && patternIndex < pattern.length()) {
            if (pattern[patternIndex] == '*') {
                // 跳过连续的*
                while (patternIndex < pattern.length() && pattern[patternIndex] == '*') {
                    patternIndex++;
                }
                
                if (patternIndex == pattern.length()) return true;
                
                // 尝试匹配剩余模式
                for (size_t i = textIndex; i < text.length(); ++i) {
                    if (simpleWildcardMatch(text.substr(i), pattern.substr(patternIndex))) {
                        return true;
                    }
                }
                return false;
                
            } else if (pattern[patternIndex] == '?' || 
                       std::tolower(pattern[patternIndex]) == std::tolower(text[textIndex])) {
                textIndex++;
                patternIndex++;
            } else {
                return false;
            }
        }
        
        // 处理剩余的*
        while (patternIndex < pattern.length() && pattern[patternIndex] == '*') {
            patternIndex++;
        }
        
        return patternIndex == pattern.length() && textIndex == text.length();
    }
    
    int estimateSyllables(const std::string& word) {
        if (word.empty()) return 0;
        
        int syllables = 0;
        bool prevWasVowel = false;
        
        for (char c : word) {
            bool isVowel = (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
                           c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U');
            
            if (isVowel && !prevWasVowel) {
                syllables++;
            }
            
            prevWasVowel = isVowel;
        }
        
        // 调整规则
        if (word.back() == 'e' || word.back() == 'E') {
            syllables--;
        }
        
        return std::max(1, syllables);
    }
    
    std::string getCurrentTime() {
        // 简化的时间获取
        return "2024-12-07 10:30:00";
    }
};

int main() {
    std::string filename;
    std::cout << "请输入文件名: ";
    std::getline(std::cin, filename);
    
    TextProcessor processor(filename);
    processor.run();
    
    return 0;
}

/*
 * 扩展练习建议：
 * 1. 添加真正的正则表达式支持
 * 2. 实现文本替换功能
 * 3. 添加文件比较功能
 * 4. 支持多种文件格式 (CSV, JSON等)
 * 5. 添加文本摘要功能
 * 6. 实现关键词提取
 * 7. 添加情感分析 (正面/负面词汇统计)
 */