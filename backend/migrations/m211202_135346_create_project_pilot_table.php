<?php

use yii\db\ColumnSchemaBuilder;
use yii\db\Migration;

/**
 * Handles the creation of table `{{%acceleration}}`.
 */
class m211202_135346_create_project_pilot_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%project_pilot}}', [
            'id' => $this->primaryKey(),
            'project_id' => $this->integer()->notNull(),
            'name' => $this->string(200)->notNull(),
            'mark' => $this->smallInteger()->notNull(),
            'comment' => $this->text()->notNull(),
        ]);

        $this->addForeignKey('fk_project_pilot_project_id', 'project_pilot', 'project_id', 'project', 'id', 'CASCADE', 'CASCADE');
        $this->createIndex('idx_project_pilot_project_id', 'project_pilot', 'project_id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%project_pilot}}');
    }
}
