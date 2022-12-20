﻿// <auto-generated />
using System;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infastructure.Migrations.Migrations
{
    [DbContext(typeof(FurnitureHelperDbContext))]
    [Migration("20221219173242_addTables")]
    partial class addTables
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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
#pragma warning restore 612, 618
        }
    }
}
