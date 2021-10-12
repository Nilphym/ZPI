﻿using Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Error
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy HH:mm}")]
        public DateTime FilingDate { get; set; }

        [Required]
        public string Description { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime Deadline { get; set; }

        public int RequiredReviewCounter { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime FinishDate { get; set; }

        public string Category { get; set; }

        public ErrorState ErrorState { get; set; }

        public ErrorImpact ErrorImpact { get; set; }

        public ErrorPriority ErrorPriority { get; set; }
        
        public ErrorType ErrorCategory { get; set; }
        
        public virtual Step Step { get; set; }
        
        public Guid? StepId { get; set; }

        public virtual Developer Developer { get; set; }
        public string DeveloperId { get; set; }

        public virtual Tester Tester { get; set; }
        public string TesterId { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }

    }
}