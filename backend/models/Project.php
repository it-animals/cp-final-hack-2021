<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "project".
 *
 * @property int $id
 * @property string $name
 * @property string|null $descr
 * @property string|null $cases
 * @property string|null $profit
 * @property int $status
 * @property int $type
 * @property int $for_transport
 * @property int $certification
 *
 * @property ProjectFile[] $projectFiles
 * @property ProjectTag[] $projectTags
 * @property Team[] $teams
 */
class Project extends \yii\db\ActiveRecord
{
    const STATUS_IDEA = 1;
    const STATUS_PROTOTYPE = 2;
    const STATUS_PRODUCT = 3;
    const STATUS_PILOT = 4;
    const STATUS_SUCCESS = 5;
    const STATUS_CLOSE = 6;
    
    const TYPE_COMFORT_TRANSORT = 1;
    const TYPE_MOBILE = 2;
    const TYPE_SAFETY = 3;
    const TYPE_ECOLOGY = 4;
    const TYPE_IT = 5;       
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'project';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        $statuses = self::getStatusList();
        $types = self::getTypeList();
        $transports = self::getTransportList();
        $certifications = self::getCertificationList();
        return [
            [['name', 'status', 'type', 'for_transport', 'certification'], 'required'],
            [['descr', 'cases', 'profit'], 'string'],
            [['status', 'type', 'for_transport', 'certification'], 'default', 'value' => null],
            [['status', 'type', 'for_transport', 'certification'], 'integer'],
            [['status'], 'in', 'range' => array_keys($statuses)],
            [['type'], 'in', 'range' => array_keys($types)],
            [['for_transport'], 'in', 'range' => array_keys($transports)],
            [['certification'], 'in', 'range' => array_keys($certifications)],
            [['name'], 'string', 'max' => 200],
            [['name'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'Код',
            'name' => 'Наименование',
            'descr' => 'Описание',
            'cases' => 'Кейсы',
            'profit' => 'Польза',
            'status' => 'Статус',
            'type' => 'Тип',
            'for_transport' => 'Для какой организации',
            'certification' => 'Сертификация',
        ];
    }

    /**
     * Gets query for [[ProjectFiles]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProjectFiles()
    {
        return $this->hasMany(ProjectFile::class, ['project_id' => 'id']);
    }

    /**
     * Gets query for [[ProjectTags]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProjectTags()
    {
        return $this->hasMany(ProjectTag::class, ['project_id' => 'id']);
    }

    /**
     * Gets query for [[Teams]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTeams()
    {
        return $this->hasMany(Team::class, ['project_id' => 'id']);
    }
    
    public static function getStatusList(): array {
        return [
            self::STATUS_IDEA => 'Идея',
            self::STATUS_PROTOTYPE => 'Прототип',
            self::STATUS_PRODUCT => 'Продукт',
            self::STATUS_PILOT => 'Пилотное внедрение',
            self::STATUS_SUCCESS => 'Внедрен',
            self::STATUS_CLOSE => 'Закрыт'
        ];
    }
    
    public static function getTypeList(): array {
        return [
            self::TYPE_COMFORT_TRANSORT => 'Доступный и комфортный городской транспорт',
            self::TYPE_MOBILE => 'Новые виды мобильности',
            self::TYPE_SAFETY => 'Безопасность дорожного движения',
            self::TYPE_ECOLOGY => 'Здоровые улицы и экология',
            self::TYPE_IT => 'Цифровые технологии в транспорте',            
        ];
    }
    
    public static function getTransportList(): array {
        return [
            1 => 'Московский метрополитен',
            2 => 'Мосгорстранс',
            3 => 'ЦОДД',
            4 => 'Организатор перевозок',
            5 => 'Мостранспроект',
            6 => 'АМПП',
        ];
    }
    
    public static function getCertificationList(): array {
        return [
            1 => 'да, требуется сертификация и у нас она есть',
            2 => 'да, требуется сертификация, но  у нас ее нет',
            3 => 'нет, не требуется',
        ];
    }
}
