namespace Domain.ProjectManagement
{
    public class ProjectDeadlineSettings
    {
        public int Id { get; set; }
        public int DaysForDeadlineYellow { get; set; } = 10;
        public int DaysForDeadlineRed { get; set; } = 5;
        public int DefaultProjectDurationDays { get; set; } = 42;

        public void Update( ProjectDeadlineSettings projectDeadlineSettings )
        {
            DaysForDeadlineRed = projectDeadlineSettings.DaysForDeadlineRed;
            DaysForDeadlineYellow = projectDeadlineSettings.DaysForDeadlineYellow;
            DefaultProjectDurationDays = projectDeadlineSettings.DefaultProjectDurationDays;
        }
    }
}
