<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tag".
 *
 * @property int $id
 * @property string $name
 *
 * @property ProjectTag[] $projectTags
 * @property RequestTag[] $requestTags
 */
class Tag extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'tag';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['name'], 'string', 'max' => 100],
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
        ];
    }

    /**
     * Gets query for [[ProjectTags]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProjectTags()
    {
        return $this->hasMany(ProjectTag::class, ['tag_id' => 'id']);
    }

    /**
     * Gets query for [[RequestTags]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getRequestTags()
    {
        return $this->hasMany(RequestTag::class, ['tag_id' => 'id']);
    }
}
