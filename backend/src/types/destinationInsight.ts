type fromUs = {
  title?: string;
  id?: string;
};

type fromOthers = {
  title?: string;
  link?: string;
};

interface destinationInsight {
  from_us?: fromUs[];
  from_others?: fromOthers[];
}

export default destinationInsight;
