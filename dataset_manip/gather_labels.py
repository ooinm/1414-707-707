# script to create label file given picked indices and all labels of train and test set
orig_labels = []
for dataset in ("train", "test"):
  with open(dataset + "set_labels", 'r') as fp:
    labels_chars = fp.read()
    orig_labels += ([int(s.strip()) for s in labels_chars[1:-1].split(',')])

picked_numbers = []
for dataset in ("train", "test"):
  with open(dataset + "_indices", 'r') as fp:
    picked_numbers += [int(s.strip()) for s in fp]

picked_labels = [orig_labels[i] for i in picked_numbers]
print()
print("export const correctLabels =")
print(picked_labels)

