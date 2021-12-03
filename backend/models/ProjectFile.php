<?php

namespace app\models;

use Yii;
use yii\helpers\Url;
use yii\web\UploadedFile;
use yii\helpers\FileHelper;

/**
 * This is the model class for table "project_file".
 *
 * @property int $id
 * @property int $project_id
 * @property string|null $name
 * @property string|null $extension
 * @property string|null $content
 *
 * @property Project $project
 */
class ProjectFile extends \yii\db\ActiveRecord
{
    /**
     * 
     * @var UploadedFile
     */
    public $file;
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'project_file';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['project_id'], 'required'],
            [['project_id'], 'default', 'value' => null],
            [['project_id'], 'integer'],
            [['content'], 'string'],
            [['name', 'extension'], 'string', 'max' => 1000],
            [['project_id'], 'exist', 'skipOnError' => true, 'targetClass' => Project::class, 'targetAttribute' => ['project_id' => 'id']],
            [['file'], 'file', 'extensions' => ['docx', 'doc', 'xlsx', 'xls', 'odt', 'ods'], 'maxSize' => 50 * 1024 * 1024],
        ];
    }
    
    public function beforeValidate() {
        if($this->file) {
            $this->name = $this->file->getBaseName();
            $this->extension = $this->file->getExtension();
            if(in_array($this->extension, ['docx', 'doc', 'xlsx', 'xls', 'odt', 'ods'])) {
                $this->content = $this->parseOfficeFile();
            }
        }
        return parent::beforeValidate();
    }
    
    private function parseOfficeFile() {
        $tmpFolder = Yii::getAlias("@runtime/tmp");
        if (!file_exists($tmpFolder)) {
            mkdir($tmpFolder);
        }
        $logs = [];
        $command = "export HOME=/tmp && libreoffice --headless --convert-to \"txt:Text (encoded):UTF8\" '{$this->file->tempName}' --outdir {$tmpFolder}";
        exec($command, $logs);
        $filename = basename($this->file->tempName);
        $name = preg_replace('/\..+$/u', '', $filename);
        $resultPath = $tmpFolder . '/' . $name . '.txt';
        $content = file_exists($resultPath) ? file_get_contents($resultPath) : null;
        FileHelper::removeDirectory($tmpFolder);
        return $content;
    }
    
    
    public function afterSave($insert, $changedAttributes) {
        parent::afterSave($insert, $changedAttributes);
        if($this->file) {
            $path = $this->getPath();
            $folder = dirname($path);
            if(!file_exists($folder)) {
                mkdir($folder);
            }
            $this->file->saveAs($path);
        }
    }
    
    public function afterDelete() {
        parent::afterDelete();
        $path = $this->getPath();
        if(file_exists($path)) {
            unlink($path);
            $folder = dirname($path);
            $files = scandir($folder);
            if(count($files) == 2) {
                rmdir($folder);
            }
        }        
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'Код',
            'project_id' => 'Проект',
            'name' => 'Наименование',
            'extension' => 'Расширение',
            'content' => 'Содержимое',
            'file' => 'Файл'
        ];
    }

    /**
     * Gets query for [[Project]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProject()
    {
        return $this->hasOne(Project::class, ['id' => 'project_id']);
    }
    /**
     * Получить путь до файла
     * @return string
     */
    public function getPath(): string {
        return Yii::getAlias("@app/files/{$this->project_id}/{$this->id}.$this->extension");
    }

    public function fields()
    {
        return [
            'id' => 'id',
            'project_id' => 'project_id',
            'name' => 'name',
            'extension' => 'extension',
            'content' => 'content',
            'file' => 'file',
            'url' => function (ProjectFile $model) {
                return Url::to(['/project-file/view', 'id' => $model->id], true);
            },
        ];
    }
}
