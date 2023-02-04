using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infastructure.Migrations.Migrations
{
    public partial class AddNewTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_completed",
                table: "project",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "buisness_cost",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    amount = table.Column<decimal>(type: "numeric", nullable: false),
                    date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_buisness_cost", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "project_deadline_settings",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    days_for_deadline_yellow = table.Column<int>(type: "integer", nullable: false),
                    days_for_deadline_red = table.Column<int>(type: "integer", nullable: false),
                    default_project_duration_days = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_project_deadline_settings", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "project_stage",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    project_id = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    completed_on = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    is_completed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_project_stage", x => x.id);
                    table.ForeignKey(
                        name: "fk_project_stage_project_project_id",
                        column: x => x.project_id,
                        principalTable: "project",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "project_deadline_settings",
                columns: new[] { "id", "days_for_deadline_red", "days_for_deadline_yellow", "default_project_duration_days" },
                values: new object[] { 1, 5, 10, 42 });

            migrationBuilder.CreateIndex(
                name: "ix_project_stage_project_id",
                table: "project_stage",
                column: "project_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "buisness_cost");

            migrationBuilder.DropTable(
                name: "project_deadline_settings");

            migrationBuilder.DropTable(
                name: "project_stage");

            migrationBuilder.DropColumn(
                name: "is_completed",
                table: "project");
        }
    }
}
