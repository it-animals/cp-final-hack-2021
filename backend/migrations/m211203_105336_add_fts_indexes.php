<?php

use yii\db\Migration;

/**
 * Class m211203_105336_add_fts_indexes
 */
class m211203_105336_add_fts_indexes extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $sql1 = "CREATE INDEX idx_gin_project
            ON project
            USING gin (to_tsvector('russian', name || ' ' ||descr || ' ' || cases || ' ' || profit));";
        $this->execute($sql1);
        $sql2 = "CREATE INDEX idx_gin_project_file
            ON project_file
            USING gin (to_tsvector('russian', content));";
        $this->execute($sql2);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropIndex('project', 'idx_gin_project');
        $this->dropIndex('project_file', 'idx_gin_project_file');
    }    
}
