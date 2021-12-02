<?php

use yii\db\ColumnSchemaBuilder;
use yii\db\Migration;

/**
 * Handles the creation of table `{{%project_review}}`.
 */
class m211202_135335_create_project_review_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%project_review}}', [
            'id' => $this->primaryKey(),
            'project_id' => $this->integer()->notNull(),
            'type' => $this->smallInteger()->notNull(),
            'expert_id' => $this->integer()->notNull(),
            'date_in' => $this->timestampWithTimezone()->notNull(),
            'mark_ready' => $this->smallInteger()->notNull(),
            'mark_idea' => $this->smallInteger()->notNull(),
            'mark_finance' => $this->smallInteger()->notNull(),
            'content' => $this->text()->notNull(),
        ]);

        $this->addForeignKey('fk_project_review_project_id', 'project_review', 'project_id', 'project', 'id', 'CASCADE', 'CASCADE');
        $this->createIndex('idx_project_review_project_id', 'project_review', 'project_id');

        $this->addForeignKey('fk_project_review_expert_id', 'project_review', 'expert_id', 'user', 'id', 'CASCADE', 'CASCADE');
        $this->createIndex('idx_project_review_expert_id', 'project_review', 'expert_id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%project_review}}');
    }

    /**
     * @param int|null $precision
     * @param string $defaultExpression
     * @return ColumnSchemaBuilder
     */
    private function timestampWithTimezone(?int $precision = null, string $defaultExpression = 'CURRENT_TIMESTAMP'): ColumnSchemaBuilder
    {
        return $this->db->schema->createColumnSchemaBuilder('TIMESTAMP WITH TIME ZONE', $precision)->defaultExpression($defaultExpression);
    }
}
