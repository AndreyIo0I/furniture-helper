﻿// <auto-generated />
using System;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infastructure.Migrations.Migrations
{
    [DbContext(typeof(FurnitureHelperDbContext))]
    partial class FurnitureHelperDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.ClientManagement.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("CommunicationChannel")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("communication_channel");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<string>("Mail")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("mail");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("phone_number");

                    b.HasKey("Id")
                        .HasName("pk_client");

                    b.ToTable("client", (string)null);
                });

            modelBuilder.Entity("Domain.CostsManagement.BuisnessCost", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("numeric")
                        .HasColumnName("amount");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("date");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_buisness_cost");

                    b.ToTable("buisness_cost", (string)null);
                });

            modelBuilder.Entity("Domain.CostsManagement.Cost", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_cost");

                    b.ToTable("cost", (string)null);
                });

            modelBuilder.Entity("Domain.ProjectManagement.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ClientId")
                        .HasColumnType("integer")
                        .HasColumnName("client_id");

                    b.Property<string>("ContractNumber")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("contract_number");

                    b.Property<DateTime>("DateOfStart")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("date_of_start");

                    b.Property<DateTime>("DeadLine")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("dead_line");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<bool>("IsCompleted")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false)
                        .HasColumnName("is_completed");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_project");

                    b.ToTable("project", (string)null);
                });

            modelBuilder.Entity("Domain.ProjectManagement.ProjectBudget", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClientPayments")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("client_payments");

                    b.Property<string>("CostPayments")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("cost_payments");

                    b.Property<decimal>("ProjectCost")
                        .HasColumnType("numeric")
                        .HasColumnName("project_cost");

                    b.Property<int>("ProjectId")
                        .HasColumnType("integer")
                        .HasColumnName("project_id");

                    b.HasKey("Id")
                        .HasName("pk_project_budget");

                    b.ToTable("project_budget", (string)null);
                });

            modelBuilder.Entity("Domain.ProjectManagement.ProjectDeadlineSettings", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    b.Property<int>("DaysForDeadlineRed")
                        .HasColumnType("integer")
                        .HasColumnName("days_for_deadline_red");

                    b.Property<int>("DaysForDeadlineYellow")
                        .HasColumnType("integer")
                        .HasColumnName("days_for_deadline_yellow");

                    b.Property<int>("DefaultProjectDurationDays")
                        .HasColumnType("integer")
                        .HasColumnName("default_project_duration_days");

                    b.HasKey("Id")
                        .HasName("pk_project_deadline_settings");

                    b.ToTable("project_deadline_settings", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DaysForDeadlineRed = 5,
                            DaysForDeadlineYellow = 10,
                            DefaultProjectDurationDays = 42
                        });
                });

            modelBuilder.Entity("Domain.ProjectManagement.ProjectStage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CompletedOn")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("completed_on");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_completed");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<int>("ProjectId")
                        .HasColumnType("integer")
                        .HasColumnName("project_id");

                    b.HasKey("Id")
                        .HasName("pk_project_stage");

                    b.HasIndex("ProjectId")
                        .HasDatabaseName("ix_project_stage_project_id");

                    b.ToTable("project_stage", (string)null);
                });

            modelBuilder.Entity("Domain.ProjectManagement.ProjectStage", b =>
                {
                    b.HasOne("Domain.ProjectManagement.Project", null)
                        .WithMany()
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_project_stage_project_project_id");
                });
#pragma warning restore 612, 618
        }
    }
}
