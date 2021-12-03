<?php

namespace app\generators;
use app\models\Tag;

/**
 * Генератор тегов из контента
 *
 * @author restlin
 */
class TagGenerator {
    /**
     * путь до исходного файла со словами в формате .txt
     */
    const DICT_RAW_PATH = __DIR__ . '/words.txt';
    /**
     * Массив уникальных слов
     * @var string[]
     */
    static $words = [];

    /**
     * @var string sha1 исходного файла словаря
     */
    static $words_hash;

    private string $content;
    
    public function __construct(string $content) {
        
        $this->content = mb_strtolower(trim(preg_replace('/\<.+?\>/ui', '', $content)), 'utf-8');
        self::loadWords();
    }
    
    /**
     * Сгенерировать теги
     * @return Tags[]
     */
    public function generate(): array {
        $raw = preg_replace('/[^а-яёa-z0-9 ]/ui', '', $this->content);
        $raw = preg_replace('/ +/ui', ' ', $raw);
        $words = explode(' ', $raw);
        $words = array_unique($words);
        $words = array_filter($words, function($word) {
            return mb_strlen($word, 'UTF-8') > 5  //длинные слова
                    && self::isWordMainCase($word) //базовая слова            
                    && !preg_match('/[уеыаоэяию]ть$/ui', $word); //не глагол!           
        });
        $tags = [];
        foreach($words as $word) {
            $tags[] = Tag::findOrCreate($word);
        }
        return $tags;
    }
    private static function getPathForTmpFile(): string {
        return sys_get_temp_dir().DIRECTORY_SEPARATOR.'restlin-words.php';
    }
    /**
     * Загрузить словарь в $words
     */
    private static function loadWords()
    {
        if (self::$words) {
            return true;
        }
        $path = self::getPathForTmpFile();
        if (file_exists($path)) {
            list(self::$words_hash, self::$words) = require $path;
        }
        if (self::$words_hash !== sha1_file(self::DICT_RAW_PATH)) {
            self::readWords();
            self::writeWords();
            self::$words_hash = sha1_file(self::DICT_RAW_PATH);
        }
    }
    /**
     * Загрузка слов в массив $words из исходного словаря
     */
    private static function readWords()
    {
        if (file_exists(self::DICT_RAW_PATH) && ($filein = @fopen(self::DICT_RAW_PATH, 'r'))) {
            while (($word = fgets($filein)) !== false) {
                self::$words += self::getConnectedWords($word);
            }
            fclose($filein);
        } else {
            throw new Exception('Не могу найти или открыть исходный файл словаря');
        }
    }
    /**
     * Запись слов в новый словарь
     */
    private static function writeWords()
    {
        $content = "<?php\nreturn ";
        $content .= var_export([sha1_file(self::DICT_RAW_PATH), self::$words], true);
        $content .= ";\n";
        $result = file_put_contents(self::getPathForTmpFile(), $content);
        if ($result === false) {
            throw new Exception('Не могу создать или открыть конечный файл словаря');
        }
    }

    /**
     * Родственные слова для слова из словаря
     * @param string $word
     * @return string[]
     */
    public static function getConnectedWords(string $word): array
    {
        $words = [];
        $base = str_replace('ё', 'е', trim($word));
        $words[$base] = true;
        if (preg_match('/[иы]й$/ui', $base)) { //именительные падежи для женского и среднего рода
            $female = preg_replace('/..$/ui', 'ая', $base);
            $words[$female] = true;
            $female2 = preg_replace('/..$/ui', 'яя', $base);
            $words[$female2] = true;
            $middle = preg_replace('/..$/ui', 'ое', $base);
            $words[$middle] = true;
        }
        return $words;
    }
    /**
     * Является ли слово базовой формой слова
     * @param string $word слово
     * @return bool
     */
    private static function isWordMainCase(string $word): bool
    {
        $base = str_replace('ё', 'е', mb_strtolower($word, 'utf-8'));
        return !self::$words || key_exists($base, self::$words);
    }
}
