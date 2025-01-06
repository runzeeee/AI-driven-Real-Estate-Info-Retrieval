import { Typography, Box, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PropertyResponse } from '../utils/api';

interface PropertyDetailsProps {
  data: PropertyResponse;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ContentSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ data }) => {
  // Parse the overview text to extract sections
  const sections = data.overview.split('\n\n').filter(Boolean);

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom>
        Property Analysis Report
      </Typography>

      {sections.map((section, index) => {
        // Check if section is a header (starts with **)
        const isHeader = section.startsWith('**');
        const content = isHeader ? section.replace(/\*\*/g, '') : section;

        return (
          <ContentSection key={index}>
            {isHeader ? (
              <>
                <Typography variant="h6" color="primary" gutterBottom>
                  {content}
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </>
            ) : (
              <Typography variant="body1" paragraph>
                {content}
              </Typography>
            )}
          </ContentSection>
        );
      })}
    </StyledPaper>
  );
};

export default PropertyDetails; 